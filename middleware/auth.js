const jwt= require('jsonwebtoken');
const config= require('config');

module.exports= function(req, res, next) {
    //get token from header
    const token= req.header('x-auth-token')

    //verify token
    if(!token){
        return res.status(401).json({ msg: 'No token, access denied!' })
    }
    try{
        const decoded= jwt.verify(token, config.get('jwtSecret'))
        req.user= decoded.user;
        next()
    }catch(err){
        console.log(err.message)
        return res.status(401).json({ msg: 'Invalid token, access denied' })
    }
}