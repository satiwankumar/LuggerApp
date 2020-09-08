const Lugger = require('../models/Lugger.model');
const Request = require('../models/Requests.model');

module.exports = async function (req, res, next) {
  //401 unathorized
  //403 forbiddent
  //req.user
  // const lugger =await Lugger.find({user:req.user._id})
  // console.log(lugger) //jam lugger ahin
  try {
    if (req.body.luggerId) {
      let lugger = await Lugger.findOne({ _id: req.body.luggerId });
      // console.log(request)
      if (!lugger) {
        return res
          .status(401)
          .json({ msg: 'There is no info for this lugger' });
      }
      console.log(lugger.user, req.user._id);

      if (lugger.user != req.user._id) {
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
    //   console.log(request.lugger.user, req.user._id);

      if (request.lugger.user != req.user._id) {
        return res.status(401).json({ msg: 'authorization denied' });
      }
      if(req.params.status ==4 && req.user !==req.user._id){
        console.log("true")
        return res.status(401).json({ msg: 'not authorized to end request ' });
      }

      next();
    }
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }

  // console.log(request)
};
