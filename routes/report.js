const express = require('express');
const router = express.Router();

//model
const Report = require('../models/Report.model')
const checkObjectId = require("../middleware/checkobjectId");

//middleware
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');






router.post('/',auth,async (req,res)=>{

    try {
        console.log(req.body)
        const {reportOn,reportReason} = req.body

        let reports = await Report.findOne({  reportingUser : req.user._id , reportOn:reportOn  })
        // console.log(reports)
        if (reports) {
            return res
                .status(400)
                .json({ message: 'User has already been reported' });
        }
       



         const report  = new Report({
            reportingUser : req.user._id,
            reportOn:reportOn,
            reportReason:reportReason

        })

        
        await report.save()
        
      //   const notification = {
      //     notifiableId :null,
      //     notificationType:"Admin",
      //     notificationId:report._id,
      //     title: "new user is report",
      //     body:"User A has reported user B"

          
      // }
      // CreateNotification(notification)
        res.json({
            "message":"your travel has been added",
            "luuger":lugger
        });
       return res.status(500).json({ message: "User has been reported" });
    



    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.get('/', [auth,admin], async (req, res) => {

    try {
        let reports = await Report.find().populate('reportingUser',['firstname','lastname','email']).populate('reportOn',['firstname','lastname','email'])
        // console.log(reports)
        if (!reports.length) {
            return res
                .status(400)
                .json({ message: 'no reports exist' });
        }
       

        res.status(200).json(reports)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


});






// @access   Private
router.get('/:report_id',
    [auth,admin,checkObjectId('report_id')],
    async (req, res) => {
      let  report_id = req.params.report_id
      try {
        const report = await Report.findOne({
          _id: report_id
        }).populate('reportingUser',['firstname','lastname','email']).populate('reportOn',['firstname','lastname','email'])
  
        if (!report) return res.status(400).json({ msg: 'report Detail not found' });
      
        return res.json(report);
      } catch (err) {
        // console.error(err.message);
        return res.status(500).json({ error: err.message });
      }
    }
  );

module.exports = router

