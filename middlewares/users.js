const { User } = require("../db");

function userMiddleware(req, res, next) {
    // Implement admin auth logic
    const username = req.headers.username; // harkirat@gmail.com
    const password = req.headers.password; /// 123456

    User.findOne({
        userName: username,
        password: password
    })
    .then(function(value) {
        if (value) {
            next();
        } else {
            res.status(403).json({
                msg: "User does'nt exist"
            })
        }
    })
}

module.exports = userMiddleware;