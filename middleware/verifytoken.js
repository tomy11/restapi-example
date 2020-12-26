const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token = req.header('user-token');
    if(!token){
        return res.status(401).json('Access Denied');
    } 
    try {
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verifyToken;
        next();
    } catch (error) {
        return res.status(400).json('Invalid Token');
    }
}