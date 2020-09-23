const express = require("express");
const bcrypt = require('bcrypt')
const _ = require('lodash')
const router = express.Router();
var isBase64 = require('is-base64');
const fs = require('fs');
var path = require('path');
const {baseUrl}= require('../utils/url')


const { check, validationResult } = require('express-validator');

//model
const User = require('../models/User.model')
const Review = require('../models/reviews.model')
//middleware 
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

//servcies
const { url } = require('../utils');
const checkObjectId = require("../middleware/checkobjectId");










//@route Get api/users (localhost:5000/api/users)
//@desc to getallusers 
//access Private


router.get('/', [auth,admin], async (req, res) => {
    // console.log(req.query)
    try {
        let users = await User.find()
        // console.log(users)
        if (!users.length) {
            return res
                .status(400)
                .json({ message: 'no user exist' });
        }
        const url =   baseUrl(req)  
        users.forEach(user=>
           user.image = `${url}${user.image}`
            )

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





//@route Get api/users/me (localhost:5000/api/users/me)
//@desc to getUserByid 
//access Private

router.get('/me', auth, async (req, res) => {

    try {
        let user = await User.findOne({ _id: req.user._id }).lean()
        // console.log(user)
        if (!user) {
            return res
                .status(400)
                .json({ message: 'User doesnot exist' });
        }
            const url =   baseUrl(req)  
           user.image = `${url}${user.image}`
        


        const reviews = await Review.find({luggerUser:req.user._id}).lean()
        let totalRating = 0
        let length =reviews.length 
        for(let i =0;i<reviews.length;i++){
            totalRating = totalRating +   reviews[i].rating  
        }
        let Average = totalRating/length
        user.AverageRating = Average
       
        res.status(200).json({
            "user": (_.pick(user, ['id', 'firstname', 'lastname', 'email', 'image','AverageRating']))

        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});















// @access   Private
router.get('/:user_id',
    [auth,admin,checkObjectId('user_id')],
    async (req, res) => {
      let  user_id = req.params.user_id
      try {
        const user = await User.findOne({
          _id: user_id
        })
  
        if (!user) return res.status(400).json({ msg: 'User Detail not found' });
        const url =   baseUrl(req)  
        user.image = `${url}${user.image}`
        return res.json(user);
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
      }
    }
  );




// @route Post api/users (localhost:5000/api/users)
// @desc to Add/Register user
// access public

router.post('/', [
    check('firstname', 'name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'please enter a password of 6 or more characters').isLength({ min: 6 }),
    check('confirmpassword', 'please enter a password of 6 or more characters').isLength({ min: 6 })

], async (req, res, next) => {

    try {
        const errors = validationResult(req);
        const url =   baseUrl(req)  

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

        user.image =`${url}${user.image}`
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

// @route Post api/users/uploadPicture (localhost:5000/api/users)
// @desc to upload profile picture 
// access public

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
        // let checkBase64 = isBase64(req.body.image, { allowMime: true });
        // if (!checkBase64) {
        //     return res.status(400).json({ errors: "please upload base64 image format " });
        // }
        let user = await User.findOne({ _id: req.user._id })
        // console.log(user)
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
        // console.log(url(req, pathName))

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


// @route Post api/users/edit (localhost:5000/api/users/edit)
// @desc to edit profile  
// access private

router.put('/edit',
    [
        auth,
        [
            check('firstname', 'firstname is required').not().isEmpty(),
            check('lastname', 'lastname is required').not().isEmpty()
        ],
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }


        const {
            firstname,
            lastname

        } = req.body;


        try {


            let user = await User.findOne({ _id: req.user._id })
            // console.log(user)
            if (!user) {
                return res
                    .status(400)
                    .json({ message: 'User doesnot exist' });
            }
            user.firstname = firstname
            user.lastname = lastname,
                await user.save();
            const url =   baseUrl(req)  
            user.image = `${url}${user.image}`
            const resuser = _.pick(user, ['id', 'firstname', 'lastname', 'email', 'image'])
            res.status(200).json({
                message: "Profile Updated Successfully",
                user: resuser
            });
        } catch (err) {
          
           
                const errors =[]
                errors.push({msg : err.message}) 
                res.status(500).json({ errors: errors });
            
        }
    }
);




// get user image





router.get("/uploads/images/:name", (req, res) => {
 
    // const myURL  = new URL(req.url)
    // console.log(myURL.host);
// console.log(req.headers.host)
    res.sendFile(path.join(__dirname, `../uploads/images/${req.params.name}`));
  });








  router.post('/status/:status', [auth,admin], async (req, res) => {
      const {status} = req.params
    //   console.log(status)
    try {
      
      let user = await User.findOne({ _id: req.body.userId });
            // console.log(user)
      if (!user)
       { return res.status(400).json({ msg: 'user doesnot exist ' });}
    
  
       if (status == 1 && user.status == 1 ) {
        return res.json({ message: 'This user is  already active ' });
      }
  
      else if (status == 0 && user.status == 0) {
        return res.json({ message: 'This user is already blocked' });
      }
   
  
   
      if (  user.status ==0 && status == 1 ) {
        
      
        user.status = status;
        await user.save();
        return res.status(200).json({ message: 'User has been Active' });
      }
       if (user.status == 1 && status == 0  ) {
        user.status = status;
        await user.save();
        return res.status(200).json({ message:  'User has been blocked' });
      }
      
     
      else{
        return res.status(200).json({ message: 'Invalid status' })
      }
      
        
    } catch (error) {
    //   console.error(error.message);
      res.status(500).json({error:error.message});
    }
  });
  
  
  

module.exports = router






