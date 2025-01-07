require('dotenv').config();
const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    if (req.headers.token) {
        const token = req.headers.token;
        try {
            const decodedData = jwt.verify(token, process.env.JWT_USER_SECRET);
            if (decodedData) {
                req.userId = decodedData.id;
                next();
            }
            else {
                res.json({
                    msg: "you are not logged in"
                })
            }
        } catch (e) {
            res.json({msg: "not logged in"});
            return    
        }
    } else {
        res.json({msg: "not logged in"});
        return
    }
}

module.exports = {
    userMiddleware
}