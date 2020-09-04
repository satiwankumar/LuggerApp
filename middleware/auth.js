const jwt = require('jsonwebtoken')
const config = require('config')

const Session = require('../models/session.model')
module.exports = async function (req, res, next) {

    //Get token from the header
    const token = req.header('x-auth-token');
  

    if (!token) {
        return res.status(401).json({ msg: 'No token authorization denied' })
    }

    
    //verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded;
        const sessions =await Session.findOne({user:req.user._id,token:token,status:true})

        if(!sessions) return res.status(401).json({ msg: 'authorization denied' })

        next();
    } catch (error) {
        res.status(401).json({ "msg": error.message })
    }

}
