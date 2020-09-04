const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')



const Contact = require('../models/Contact.model')








router.post('/',[
    check('name', 'name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('message', 'please enter messages').not().isEmpty(),
    

], async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

       

        //create new user
        let contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message:req.body.message

            //   image: req.file.path 
        });


        //hash passoword


        await contact.save()
        res.status(200).json({
         
                
                message : "We will get back to you soon, thank you for reaching out"
               
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }


})

module.exports = router