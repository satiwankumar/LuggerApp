const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const lugger = require('../middleware/lugger');

const Request = require('../models/Requests.model');
const Lugger = require('../models/Lugger.model');
// const ContactModel = require('../models/Contact.model');
const router = express.Router();

//PostRequest /api/request
//access private

router.post(
  '/',
  [
    auth,
    [
      check('firstName', 'firstName is required.').not().isEmpty(),
      check('lastName', 'lastName is required.').not().isEmpty(),
      check('dropOffAddress', 'DropOffAddress is required.').not().isEmpty(),
      check('images', 'images is required.').not().isEmpty(),
      check('additionalNote', 'additionalNote is required.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    const {
      firstName,
      lastName,
      lugger,
      luggageWeight,
      pickUpAddress,
      dropOffAddress,
      images,
      additionalNote,
    } = req.body;
    try {
      const requests = await Request.find({
        lugger: lugger,
        user: req.user._id,
      });
      if (requests.length)
        return res.json({ error: 'You have already sent Request' });

      let newRequest = new Request({
        user: req.user._id,
        firstName,
        lastName,
        lugger,
        luggageWeight,
        pickUpAddress,
        dropOffAddress,
        images,
        additionalNote,
      });

      const result = await newRequest.save();
      // console.log(result);
      return res.status(200).json({
        code: 200,
        message: 'Your request has been sent',
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
);

// get all CurrentUserRequests

router.get('/getrequests', auth, async (req, res) => {
  try {
    let request = await Request.find({ user: req.user._id }).populate('user', [
      'firstname',
      'lastname',
      'email',
    ]);

    if (!request.length) {
      return res
        .status(400)
        .json({ msg: 'There is no request info for  user' });
    }
    res.status(200).json({ request: request });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server Error');
  }
});

//get the list of requests recieved on posted travels

router.get('/gettravelrequests', [auth, lugger], async (req, res) => {
  try {
    let request = await Request.find({
      lugger: req.body.luggerId,
    }).populate('user', ['firstname', 'lastname', 'email']);

    if (!request.length) {
      return res
        .status(400)
        .json({ msg: 'There is no request info for this lugger' });
    }
    res.status(200).json({ request: request });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server Error');
  }
});

//approve 1 or reject 2 delivered 3 received 4

router.post('/status/:status', [auth, lugger], async (req, res) => {
  try {
    let request = await Request.findOne({ _id: req.body.requestId });
    let lugger = await Lugger.findOne({ _id: request.lugger });

    if (!request)
      return res.status(400).json({ msg: 'Request doesnot exist ' });

    console.log(request.luggageWeight, lugger.remainingWeight);


    if (req.params.status == 1 && request.status == 1) {
      return res.json({ "message": 'You  have already Approved this request' });
    }

    if (req.params.status == 2 && request.status == 2) {
      return res.json({ "message": 'You have already Rejected this request' });
    }
    if (req.params.status == 3 && request.status == 3) {
      return res.json({ "message": 'You have already marked this delivered' });
    }

    // request.status = req.params.status;
    // await request.save();
    if (req.params.status == 1) {
      

    if (request.luggageWeight > lugger.remainingWeight) {
      return res.status(500).json({
        "message":
          'Cannot Accept this Request Beacause luggageWeight is more than remainingWeight of lugger',
      });
    }
      lugger.remainingWeight = lugger.remainingWeight - request.luggageWeight;
      request.status = req.params.status;

      await request.save();
      await lugger.save();
      return res.status(200).json({ message: 'You request has been approved' });
    }
    else if (req.params.status == 2) {
      request.status = req.params.status;

      await request.save();
      return res.status(200).json({ request: 'you request has been rejected' });
    }
    else if (req.params.status == 3) {
      request.status = req.params.status;

      await request.save();
        return res.status(200).json({ request: 'Request marked as Delivered' });
    }
    else if (req.params.status == 4) {
      request.status = req.params.status;

      await request.save();
        return res.status(200).json({ request: 'Requested Job is Ended' });
    }
    
      
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server Error');
  }
});

//End Request == delivered

module.exports = router;
