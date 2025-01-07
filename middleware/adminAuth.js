require('dotenv').config();
const jwt = require("jsonwebtoken");
function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    if (token) {
        const decodedData = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
        if (decodedData) {
            req.userId = decodedData.id;
            next();
            return
        } else {
            res.json({
                msg: "you haven't logged in"
            })
            return
        }
    } else {
        res.json({msg: "not logged in"});
        return
    }
}

module.exports = {
    adminMiddleware
}