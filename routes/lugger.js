const express = require('express');
const { required } = require('joi');
const router = express.Router();
const { check, validationResult } = require('express-validator')



//model
const Lugger = require('../models/Lugger.model')
//middleware
const auth = require('../middleware/auth')



//Add Travel api


router.post(
    '/',
    [
      auth,
      [
        check('from', 'from is required').not().isEmpty(),
        check('to', 'to is required').not().isEmpty(),
        check('totalWeight', 'totalWeight is required').not().isEmpty(),
        check('costPerKg', 'costPerKg is required').not().isEmpty(),
        check('description', 'description is required').not().isEmpty(),
        check('turnAroundTime', 'turnAroundTime is required').not().isEmpty(),
      ],
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log(req.body);
      const {
        from,
        to,
        totalWeight,
        costPerKg,
        description,
        turnAroundTime,
        remainingWeight,
        airline,
        flightNumber,
        travelDate,
        arrivalDate,
        delivery
        

      } = req.body;
  
      //build profile objects
      const LuggerFeilds = {};
      LuggerFeilds.user = req.user._id;
      if (from) LuggerFeilds.from = from;
      if (to) LuggerFeilds.to = to;
      if (totalWeight) LuggerFeilds.totalWeight = totalWeight;
      if (remainingWeight) LuggerFeilds.remainingWeight = remainingWeight;
      if (costPerKg) LuggerFeilds.costPerKg = costPerKg;
      if (description) LuggerFeilds.description = description;
      if (airline) LuggerFeilds.airline = airline;
      if (flightNumber) LuggerFeilds.flightNumber = flightNumber;
      if (travelDate) LuggerFeilds.travelDate = travelDate;
      if (arrivalDate) LuggerFeilds.arrivalDate = arrivalDate;
      if (turnAroundTime) LuggerFeilds.turnAroundTime = turnAroundTime;
      if (delivery) LuggerFeilds.delivery = delivery;
      
    
  
      //build social object
      
     
  
      try {
        
  
        //else if lugger doesnot exist create it
        lugger = new Lugger(LuggerFeilds);
        await lugger.save();
        res.json({
            "message":"your travel has been added",
            "luuger":lugger
        });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({"error":error.message});
      }
    }
  );



//get all RegisteredLuggers

  router.get('/', auth, async (req, res) => {
    try {
      let lugger = await Lugger.find({ user: req.user._id }).populate(
        'user',
        ['firstname', 'lastname','email']
      );
  
      if (!lugger) {
        return res
          .status(400)
          .json({ msg: 'There is not travel info for this user' });
      }
      res.json(lugger);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server Error');
    }
  });

  //get all approvedLuggers

  router.get('/approved', auth, async (req, res) => {
      res.send('/approved')
  });

// getLuggerDetailByID 

  router.get('/:id', auth, async (req, res) => {
    try {
      let lugger = await Lugger.find({ _id: req.params.id }).populate(
        'user',
        ['firstname', 'lastname','email']
      );
  
      if (!lugger) {
        return res
          .status(400)
          .json({ msg: 'There is not travel info for this user' });
      }
      res.json(lugger);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server Error');
    }
  });


  //find all user by (from to UggageWeight  TravelDate)
  router.get('/filter', auth, async (req, res) => {

        const filter = {};

        for (const key in req.query) {
            if (req.query.hasOwnProperty(key)) {
                const value = req.query[key];
                if(value)
                    filter[key] = value;
            }
        }

    try {
      let lugger = await Lugger.find(filter).populate(
        'user',
        ['firstname', 'lastname','email']
      );
  
      if (!lugger.length ) {
        return res
          .status(400)
          .json({ msg: 'no tavel exist' });
      }
      res.json({"lugger":lugger});
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server Error');
    }
  });
  module.exports = router

