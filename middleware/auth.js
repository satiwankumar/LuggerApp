const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = async function (req, res, next) {

    //Get token from the header
    const token = req.header('x-auth-token');
  

    if (!token) {
        return res.status(401).json({ msg: 'No token authorization denied' })
    }

    var dateNow = new Date();
    //verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
       
       if(decoded.exp < dateNow.getTime()/1000){
            return  res.status(401).json({ msg: 'Token is expired' })
       }
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ "msg": error.message })
    }

}
