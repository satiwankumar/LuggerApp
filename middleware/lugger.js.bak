const Lugger = require('../models/Lugger.model');
const Request = require('../models/Requests.model');

module.exports = async function (req, res, next) {
  //401 unathorized
  //403 forbiddent
  //req.user
  // const lugger =await Lugger.find({user:req.user._id})
  // console.log(lugger) //jam lugger ahin
  try {
    if (req.body.luggerId && !req.user.isAdmin ) {


      let lugger = await Lugger.findOne({ _id: req.body.luggerId });
      // console.log(request)
      if (!lugger) {
        return res
          .status(401)
          .json({ msg: 'There is no info for this lugger' });
      }
      // console.log(lugger.user, req.user._id);

      if (lugger.user != req.user._id ) {
        return res.status(401).json({ msg: 'authorization denied' });
      }



      next();
    } else if (req.body.requestId) {
      let request = await Request.findOne({
        _id: req.body.requestId,
      }).populate('lugger');
      //   console.log(request);

      if (!request) {
        return res
          .status(401)
          .json({ msg: 'There is no info for this request' });
      }

      // console.log(lugger)
      
      
      if (( JSON.stringify(request.lugger.user) !== JSON.stringify(req.user._id)) && (req.params.status == 1 || req.params.status == 2 ))
       {
        return res.status(401).json({ msg: 'authorization denied' });
      }
      // console.log(req.user._id,request.user._id)
      if ((req.params.status == 3) &&  (request.user._id != req.user._id)) {
  
        return res.status(401).json({ msg: 'not authorized to end request ' });
      }

      next();
    }
    else  if(req.user.isAdmin){
    next();
  }
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }

  // console.log(request)
};
