const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')



const auth = require('../middleware/auth')
// const User = require('../models/User.model')
// const Lugger = require('../models/Lugger.model');
const Review = require('../models/reviews.model');



router.get('/', [auth, [

    check('luggerUser', 'luggerUser is required').not().isEmpty(),
]], async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let review = await Review.findOne({ luggerUser:req.body.luggerUser  })
        // console.log(review)
        if (!review) {
            return res
                .status(400)
                .json({ message: 'review doesnot exist' });
        }
        res.status(200).json({
            "reviews":review

        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




// @route Post api/users (localhost:5000/api/users)
// @desc to Add/Register user
// access public

router.post('/', [auth, [
    check('rating', 'rating is required').isNumeric().isLength({ max: 1 }),
    check('message', 'message is required').not().isEmpty(),
    check('luggerUser', 'luggerUser is required').not().isEmpty(),
]],
async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const reviews = await  Review.find({luggerUser:req.body.luggerUser,user:req.user._id})
        if(reviews.length) return res.json({"message": "You have already posted review.Thanks for your feedback "})



        //create new user
        review = new Review({
            rating: req.body.rating,
            message: req.body.message,
            luggerUser:  req.body.luggerUser,
            user:req.user._id

        });


        //hash passoword


        await review.save()
        res.status(200).json({
            message: "Review has been Posted",
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }


})

module.exports = router