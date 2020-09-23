const jwt = require('jsonwebtoken')
const config = require('config')

const Session = require('../models/session.model')
module.exports = async function (req, res, next) {

    //Get token from the header
 

    
    //verify token
    try {
        const header = req.header('Authorization');
        // console.log(header.split(' ')[1])
    const token  = header.split(' ')[1]

    // console.log(token)


    if (!token) {
        return res.status(401).json({ msg: 'No token authorization denied' })
    }
        
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded;
        console.log(req.user)

        // if(req.user.status !==1){
        //     return res.status(401).json({msg:'You are block please contact Admin to Activate Account'})
        // }

        const sessions =await Session.findOne({user:req.user._id,token:token,status:true})
        if(!sessions) return res.status(401).json({ msg: 'authorization denied' })


        next();
    } catch (error) {
        // console.log("error dedua")
        res.status(401).json({ "msg": error.message })
    }

}
