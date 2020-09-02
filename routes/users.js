const express = require("express");
const bcrypt = require('bcrypt')
const _ = require('lodash')
const router = express.Router();
var path = require('path');
var fs = require('fs');
const { check, validationResult } = require('express-validator');

const User = require('../models/User.model')
const { url } = require('../utils')
const jwt = require('jsonwebtoken')
const config = require('config')
const {sendEmail} = require('../service/email')





router.post('/', [
    check('firstname', 'name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'please enter a password of 6 or more characters').isLength({ min: 6 }),
    check('confirmpassword', 'please enter a password of 6 or more characters').isLength({ min: 6 })

], async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // if user duplicated
        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).json({ "message": "User already registered" })


        //if password doesnot match
        if (req.body.password !== req.body.confirmpassword) {
            return res.status(400).json({ "message": "confirm password doesnot match" })
        }


        //decode the base 4 image 
        let image = req.body.image
        let buff = new Buffer.from(image, 'base64');
        let r = Math.random().toString(36).substring(7)
        const salt = await bcrypt.genSalt(10)
        let filename = bcrypt.hashSync(r, salt).substring(-1, 7)
        let pathName = `uploads/images/${r}.png`;
        fs.writeFileSync(path.join(__dirname, `../${pathName}`), buff)
        // var full_address = req.protocol + "://" + req.headers.host ;
        console.log(url(req, pathName))

        //create new user
        user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            image: "uploads/images/jweyg.png"

            //   image: req.file.path 
        });


        //hash passoword
        user.password = bcrypt.hashSync(req.body.password, salt)
        const token = await user.generateAuthToken()


        await user.save()
        res.status(200).json({
            message: "Registration Success, please login to proceed",
            token: token,
            createdUser: user
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }


})

module.exports = router

