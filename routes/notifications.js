const express = require('express');
const router = express.Router();
const Notification = require('../models/notifications.model');
const { check, validationResult } = require('express-validator');
const axios = require('axios')
const FCM = require('fcm-node')
const config = require('config')
const auth  = require('../middleware/auth')
const admin  = require('../middleware/admin');
const Session = require('../models/session.model');
const checkObjectId = require('../middleware/checkobjectId');

const serverKey = config.get('privatekey') //put the generated private key path here    


//set the route path and initialize the API

router.get('/admin', [auth,admin], async (req, res) => {
    


    try {
        console.log(req.query)
    const {page,limit} = req.query
    
  let  currentpage =  page ? parseInt(page, 10) : 1 
    console.log(currentpage)

   let per_page = limit? parseInt(limit, 10) : 5 
    console.log(limit)
    
    let offset = (currentpage - 1) * per_page;
    let notifications = await Notification.find({notifiableId:req.user._id}).populate('notifiableId',['id','email']).limit(per_page).skip(offset).lean();
    if (!notifications.length) {
        return res
            .status(400)
            .json({ message: 'no notification exist' });
    }
    
   let Totalcount = await Notification.find({notifiableId:req.user._id}).populate('notifiableId',['id','email']).count()
    const paginate = {
    currentPage: currentpage,
    perPage: per_page,
    total: Math.ceil(Totalcount/per_page),
    to: offset,
    data: notifications
    }
    
    return res.json(paginate);

      
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/',auth,[
    check('notifiableId', 'notifiableId is required').not().isEmpty(),
    
    check('notificationType', 'notificationType is required').not().isEmpty(),
    check('title', 'title is required').not().isEmpty(),
    check('body', 'Please Enter body ').not().isEmpty()

],async (req,res)=>{
    const errors = validationResult(req);
   
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    try {
        console.log(req.body)
        const {notifiableId,notificationType,title,body} = req.body
        checkObjectId(notifiableId)


         const notification  = new Notification({
            notifiableId:notifiableId,
            notificationType:notificationType,
            title:title,
            body:body

        })

        await notification.save()
        return res.status(200).json("notification created successfully")

    // console.log(serverKey)
    
    // var fcm = new FCM(serverKey)
 
    // const deviceTokens = []
    // const   sessions = await Session.find({user:notifiableId})
    // sessions.forEach(element => {
    //     deviceTokens.push(element.deviceId)
    // });
    // console.log(deviceTokens[0])
    // var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    //     to: deviceTokens[0], 
    //     collapse_key: 'your_collapse_key',
        
    //     notification: {
    //         title: title, 
    //         body: body 
    //     },
        
    //     data: {  //you can send only notification or only data(or include both)
    //         my_key: {id:"1","name" : "satiwan"},
    //         my_another_key: 'my another value'
    //     }
    // }
    
    // fcm.send(message, function(err, response){
    //     if (err) {
    //         console.log(err)
    //         console.log("Something has gone wrong!")
    //     return res.json(response)

    //     } else {
    //         console.log("Successfully sent with response: ", response)
    //         return res.json(response)
    //     }
    // })

      



    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// router.put('/notifications/:id',function(req,res,next){
//   Notification.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
//     Notification.findOne({_id:req.params.id}).then(function(notification){
//       console.log(req.body, 'what is happening');
//       res.send(notification);
//     });
//   })
// });

// router.delete('/notifications/:id',function(req,res,next){
//   Notification.findByIdAndRemove({_id:req.params.id}).then(function(notification) {
//   res.send(notification);
//     });
// });

module.exports = router;