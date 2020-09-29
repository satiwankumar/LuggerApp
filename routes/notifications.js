const express = require('express');
const router = express.Router();
const Notification = require('../models/notifications.model');
const { check, validationResult } = require('express-validator');

const auth  = require('../middleware/auth')
const admin  = require('../middleware/admin')

//set the route path and initialize the API

router.get('/', [auth,admin], async (req, res) => {
    
    // console.log(req.query)
    try {
        let notification = await Notification.find()
        // console.log(users)
        if (!notification.length) {
            return res
                .status(400)
                .json({ message: 'no notification exist' });
        }
        // const url =   baseUrl(req)  
        // notification.forEach(user=>
        //    user.image = `${url}${user.image}`
        //     )

        res.status(200).json(notification)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// function getNotifications(req,res,next){
//   Notification.find({}).then(function(notifications){
//     res.send(notifications);
//   })
// );
//
// router.get('/notifications', getNotifications);




router.post('/',auth,[
    check('user', 'user is required').not().isEmpty(),
    check('title', 'title is required').not().isEmpty(),
    check('body', 'Please Enter body ').not().isEmpty()

],async (req,res)=>{
    const errors = validationResult(req);
   
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


    try {
        console.log(req.body)
        const {user,title,body} = req.body

    


         const notification  = new Notification({
            user : req.user._id,
            title:title,
            body:body

        })

        await notification.save()
       return res.status(500).json({ message: "notification has been created" });
    



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