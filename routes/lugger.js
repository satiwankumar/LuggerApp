const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')

const {baseUrl}= require('../utils/url')


//model
const Lugger = require('../models/Lugger.model')
const Request = require('../models/Requests.model')
//middleware
const auth = require('../middleware/auth')
const admin = require('../middleware/admin');
const checkObjectId = require('../middleware/checkobjectId');
const lugger = require('../middleware/lugger');

const Review = require('../models/reviews.model');
const { default: Axios } = require('axios');
const { CreateNotification } = require('../utils/Notification');



//Add Travel api/luggers

router.get('/', [auth,admin], async (req, res) => {

  try {
      let luggers = await Lugger.find().populate(
        'user',
        ['firstname', 'lastname','email','image']
      );


      // console.log(luggers)
      if (!luggers.length) {
          return res
              .status(400)
              .json({ message: 'no Lugger exist' });
      }
      const url =   baseUrl(req)  


  var unique = [];
// var distinct = [];
for( let i = 0; i < luggers.length; i++ ){
  if( !unique[luggers[i].user.image]){
       luggers[i].user.image = `${url}${luggers[i].user.image}`
    unique[luggers[i].user.image] = 1;
  }
}


      
      
    
   
   
    

     
      res.status(200).json(luggers)
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


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
      // console.log(req.body);
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
      
    
  
      //check if record already exist 
      


    let lugger = await Lugger.find({from:from,to:to,travelDate:travelDate,arrivalDate:arrivalDate,user:req.user._id})

    if (lugger.length ) {
      return res
        .status(400)
        .json({ "message": "lugger already exist " });
    }
  
      
  
      try {
        
  
        //else if lugger doesnot exist create it
        lugger = new Lugger(LuggerFeilds);
        await lugger.save();

        const notification = {
          user :null,
          notificationType:"Admin",
          notificationId:lugger._id,
          title: "new lugger is created",
          body:"lugger  has been created"

          
      }
      CreateNotification(notification)
        res.json({
            "message":"your travel has been added",
            "luuger":lugger
        });
      } catch (error) {
        // console.error(error.message);
        res.status(500).json({"error":error.message});
      }
    }
  );



//get all RegisteredTravelbyCurrentUser

  router.get('/me', auth, async (req, res) => {
    try {
      let luggers = await Lugger.find({ user: req.user._id }).populate(
        'user',
        ['firstname', 'lastname','email','image']
      );
  
      if (!luggers.length) {
        return res
          .status(400)
          .json({ msg: 'There is not travel info for luggers' });
      }
        const url =   baseUrl(req)  
     
        luggers[0].user.image = `${url}${luggers[0].user.image}`

      
      res.json(luggers);


    } catch (error) {
      // console.error(error.message);
      res.status(500).json({"error":error.message});
    }
  });

  //get all approvedLuggers

  // router.get('/approved', auth, async (req, res) => {
  //     res.json('/approved')
  // });

// getLuggerDetailByID 



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
      let luggers = await Lugger.find(filter).populate(
        'user',
        ['firstname', 'lastname','email','image']
      ).lean();
  
      if (!luggers.length ) {
        return res
          .status(400)
          .json({ msg: 'no tavel exist' });
      }
      

    const Filtered =   luggers.filter(lugger =>lugger.user.id !==req.user._id)

    
      const url =   baseUrl(req)  

      var unique = [];
      // var distinct = [];
      for( let i = 0; i < Filtered.length; i++ ){
        if( !unique[Filtered[i].user.image]){
             Filtered[i].user.image = `${url}${Filtered[i].user.image}`
          unique[Filtered[i].user.image] = 1;
        }
      }
      

      return res.json({"luggers":Filtered});
    } catch (error) {
      // console.error(error.message);
     return  res.status(500).json({"error":error.message});
    }
  });








  router.get('/:lugger_id', [auth,checkObjectId('lugger_id')], async (req, res) => {

    let lugger_id = req.params.lugger_id
  
      try {
        let lugger = await Lugger.findOne({ _id: lugger_id }).populate(
          'user',
          ['firstname', 'lastname','email','image']
        ).lean();
        if (!lugger) return res.status(400).json({ msg: 'Lugger Detail not found' });

  
        lugger.requests = await Request.find({ lugger: lugger_id }).select('user').lean();
        lugger.reviews = await Review.find({luggerUser:lugger.user}).populate('user',['firstname','lastname','email','image','AverageRating']).lean()
  
        let totalRating = 0
        let length =lugger.reviews.length 
        for(let i =0;i<length;i++){
            totalRating = totalRating +   lugger.reviews[i].rating  
        }
    
        let Average = (totalRating/length).toFixed(2)

      lugger.user.AverageRating = Average     
        const url =   baseUrl(req)  
         lugger.user.image = `${url}${lugger.user.image}`
         lugger.reviews.map(review=>review.user.image = `${url}${review.user.image}`)
         
        res.json(lugger);
        
      } catch (error) {
        // console.error(error.message);
        res.status(500).json({"error":error.message});
      }
    });
  
  
  
  
  



  router.get('/requests/me', auth, async (req, res) => {
    try {
      let luggers = await Lugger.find({ user: req.user._id }).populate(
        'user',
        ['firstname', 'lastname','email','image']
      );
      // return res.json(luggers)
      
      if (!luggers.length) {
        return res
          .status(400)
          .json({ msg: 'There is not travel info for luggers' });
      }
        
      const url =   baseUrl(req)  


      let requests = await Request.find({}).populate('user', ['firstname', 'lastname', 'email','image']);
  
      if (!requests.length) {
        return res
          .status(400)
          .json({ msg: 'There is no request info for this lugger' });
      }
 const Requests =[]

      requests.forEach((request) => {
        luggers.forEach((lugger) => {
              // console.log(request.lugger,lugger.id)
            if (request.lugger == lugger.id)
                Requests.push(request)
        })
    })
    if (!Requests.length) {
      return res
        .status(400)
        .json({ msg: 'There is no request info for this lugger' });
    }
      
    var unique = [];
    // var distinct = [];
    for( let i = 0; i < Requests.length; i++ ){
      if( !unique[Requests[i].user.image]){
           Requests[i].user.image = `${url}${Requests[i].user.image}`
        unique[Requests[i].user.image] = 1;
      }
    }
    

      res.json(Requests);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({"error":error.message});
    }
  });

  //get the list of requests recieved on posted travels

router.get('/gettravelrequests', [auth, lugger], async (req, res) => {
  try {
    let requests = await Request.find({
      lugger: req.body.luggerId,
    }).populate('user', ['firstname', 'lastname', 'email','image']);






    if (!requests.length) {
      return res
        .status(400)
        .json({ msg: 'There is no request info for this lugger' });
    }


    const url =   baseUrl(req)  


    var unique = [];
  // var distinct = [];
  for( let i = 0; i < requests.length; i++ ){
    if( !unique[requests[i].user.image]){
         requests[i].user.image = `${url}${requests[i].user.image}`
      unique[requests[i].user.image] = 1;
    }
  }
  
  


    res.status(200).json({ request: requests });
  } catch (error) {
    // console.error(error.message);
    res.status(500).send('server Error');
  }
});


//status 0 is pending default
//status 1 is to approve
//status 2 is to reject 

router.post('/status/:status', [auth,lugger], async (req, res) => {
  try {
    
    let lugger = await Lugger.findOne({ _id: req.body.luggerId });

    if (!lugger)
     { return res.status(400).json({ msg: 'lugger doesnot exist ' });}
  


    if (req.params.status == 1 && lugger.status == 1 ) {
      return res.json({ message: 'You  have already Approved this request' });
    }

    else if (req.params.status == 2 && lugger.status == 2) {
      return res.json({ message: 'You have already Rejected this request' });
    }
 
    if (req.params.status == 1 && lugger.status == 0 && req.user.isAdmin == true ) {
      
    
      lugger.status = req.params.status;
      await lugger.save();
      return res.status(200).json({ message: 'Travel Request has been Approved' });
    }
   else  if (req.params.status == 2 && lugger.status == 0 && req.user.isAdmin == true) {
      lugger.status = req.params.status;
      await lugger.save();
      return res.status(200).json({ message:  'Travel Request has been Rejected' });
    }
    
    // else if (req.params.status == 3 && lugger.status == 1) {
     else  if (req.params.status == 3 ) {
      
      lugger.status = req.params.status;
      

      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      lugger.landedTime = dateTime

      await lugger.save();
        return res.status(200).json({ message: 'Traveller is Landed' });
    }
    
    // else if (req.params.status == 4 && lugger.status == 3) {
    else if (req.params.status == 4 ) {

    lugger.status = req.params.status;

      await lugger.save();
        return res.status(200).json({ message: 'Travel  is Ended' });
    }
    
    else{
      return res.status(200).json({ message: 'Invalid status' })
    }
    
      
  } catch (error) {
    // console.error(error.message);
    res.status(500).json({error:error.message});
  }
});


router.post('/delete/:id',[auth,admin],async (req,res)=>{
  const id = req.params.id

      await Lugger.findOneAndRemove({ _id: id });
res.json("user deleted")

})



  module.exports = router

