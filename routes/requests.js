const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Request = require('../models/Requests.model');
// const ContactModel = require('../models/Contact.model');
const router = express.Router();





//PostRequest /api/request
//access private

router.post('/', [auth, [
    check("firstName", "firstName is required.").not().isEmpty(),
    check("lastName", "lastName is required.").not().isEmpty(),
    check("dropOffAddress", "DropOffAddress is required.").not().isEmpty(),
    check("images", "images is required.").not().isEmpty(),
    check("additionalNote", "additionalNote is required.").not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { firstName, lastName, lugger, luggageWeight, pickUpAddress, dropOffAddress, images, additionalNote } = req.body;
    try {


        const requests = await Request.find({ lugger: lugger, user: req.user._id })
        if (requests.length) return res.json({ "error": "You have already sent Request Please Wait for Approval " })


        let newRequest = new Request({
            user: req.user._id,
            firstName,
            lastName,
            lugger,
            luggageWeight,
            pickUpAddress,
            dropOffAddress,
            images,
            additionalNote
        });





        const result = await newRequest.save();
        console.log(result);
        return res.status(200).json({
            code: 200,
            message: 'Your request has been sent'
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": error.message });
    }
});



// get all CurrentUserRequests


router.get('/getrequests', auth, async (req, res) => {
    try {
        let request = await Request.find({ user: req.user._id }).populate(
            'user',
            ['firstname', 'lastname', 'email']
        );

        if (!request.length) {
            return res
                .status(400)
                .json({ msg: 'There is no request info for  user' });
        }
        res.status(200).json({ "request": request });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server Error');
    }
});


//get the list of requests recieved on posted travels


router.get('/gettravelrequests', auth, async (req, res) => {
    try {
        let request = await Request.find({ lugger: req.body.luggerId }).populate(
            'user',
            ['firstname', 'lastname', 'email']
        );

        if (!request.length) {
            return res
                .status(400)
                .json({ msg: 'There is no request info for  user' });
        }
        res.status(200).json({ "request": request });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server Error');
    }
});


//Approve requests
router.get('/', auth, async (req, res) => {
    try {
        let request = await Request.find({ lugger: req.body.luggerId }).populate(
            'user',
            ['firstname', 'lastname', 'email']
        );

        if (!request.length) {
            return res
                .status(400)
                .json({ msg: 'There is no request info for  user' });
        }
        res.status(200).json({ "request": request });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server Error');
    }
});

//approve or reject 

router.post('/status/:status', auth, async (req, res) => {
    try {

        console.log(req.params)
        let request = await Request.findOne({ _id: req.body.requestId }).populate(
            'user',
            ['firstname', 'lastname', 'email']
        );

        if (!request) {
            return res
                .status(400)

                .json({ msg: 'Request doesnot exist ' });
        }

        if (req.params.status == 1 && request.status == 1) { return res.json({ "message": "You have already Approved request" }) }

        if (req.params.status == 2 && request.status == 2) { return res.json({ "message": "You have already Rejected request" }) }

        request.status = req.params.status
        await request.save()
        res.status(200).json({ "request": request });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server Error');
    }
});





module.exports = router;