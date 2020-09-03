const express = require("express");
const bcrypt = require('bcrypt')
const _ = require('lodash')
const router = express.Router();
var isBase64 = require('is-base64');
const fs = require('fs');
var path = require('path');

const { check, validationResult } = require('express-validator');


//model
const User = require('../models/User.model')
//middleware 
const auth = require('../middleware/auth')
//servcies
const { url } = require('../utils')




router.put('/edit',
    [
        auth,
        [
            check('firstname', 'firstname is required').not().isEmpty(),
            check('lastname', 'lastname is required').not().isEmpty()
        ],
    ],
    async (req, res) => {

        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }


        const {
            firstname,
            lastname

        } = req.body;


        try {


            let user = await User.findOne({ _id: req.user._id })
            console.log(user)
            if (!user) {
                return res
                    .status(400)
                    .json({ message: 'User doesnot exist' });
            }
            user.firstname = firstname
            user.lastname = lastname,
                await user.save();
            res.status(200).json({
                "user": (_.pick(user, ['id', 'firstname', 'lastname', 'email', 'image']))

            })
        } catch (error) {
            console.error(error.message);
            res.status(500).send('server Error');
        }
    }
);








router.put('/edit',
    [
        auth,
        [
            check('firstname', 'firstname is required').not().isEmpty(),
            check('lastname', 'lastname is required').not().isEmpty()
        ],
    ],
    async (req, res) => {

        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }


        const {
            firstname,
            lastname

        } = req.body;


        try {


            let user = await User.findOne({ _id: req.user._id })
            console.log(user)
            if (!user) {
                return res
                    .status(400)
                    .json({ message: 'User doesnot exist' });
            }
            user.firstname = firstname
            user.lastname = lastname,
                await user.save();
            res.status(200).json({
                "user": (_.pick(user, ['id', 'firstname', 'lastname', 'email', 'image']))

            })
        } catch (error) {
            console.error(error.message);
            res.status(500).send('server Error');
        }
    }
);







//@route Get api/users/:id (localhost:5000/api/users/5f509262c7d9dc3148624107)
//@desc to getUserByid 
//access Private

router.get('/me', auth, async (req, res) => {

    try {
        let user = await User.findOne({ _id: req.user._id })
        console.log(user)
        if (!user) {
            return res
                .status(400)
                .json({ message: 'User doesnot exist' });
        }
        res.status(200).json({
            "user": (_.pick(user, ['id', 'firstname', 'lastname', 'email', 'image']))

        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




// @route Post api/users (localhost:5000/api/users)
// @desc to Register user
// access public

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
            image: pathName

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



router.post('/uploadpicture', [auth,
    [
        check('image', 'image is required').not().isEmpty(),

    ]
], async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let checkBase64 = isBase64(req.body.image, { allowMime: true });
        if (!checkBase64) {
            return res.status(400).json({ errors: "please upload base64 image format " });
        }
        let user = await User.findOne({ _id: req.user._id })
        console.log(user)
        if (user && user.image !=="") {
            fs.unlinkSync(path.join(__dirname, `../${user.image}`));
            user.image =""
        }
        


        let image = req.body.image
        let buff = new Buffer.from(image, 'base64');
        let r = Math.random().toString(36).substring(7)
        let pathName = `uploads/images/${r}.png`;
        fs.writeFileSync(path.join(__dirname, `../${pathName}`), buff)
        // var full_address = req.protocol + "://" + req.headers.host ;
        console.log(url(req, pathName))

        // //create new user
       user.image = pathName
        await user.save()
        res.status(200).json({
            message: "profileImage Uploaded Successsfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }


})





module.exports = router

