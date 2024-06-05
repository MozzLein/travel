const jwt = require('jsonwebtoken');
require('dotenv').config()
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).redirect('/login')
    }

    // const token = authorizationHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).redirect('/login')
        }
        
        req.user = decoded.user;
        next();
    });
};
