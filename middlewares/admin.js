const {Admin } = require('../db');

async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    const username = req.headers.username;
    const password = req.headers.password;
    const isAdmin  = await Admin.findOne({userName: username, password: password});
    if(isAdmin){
        next();
    }
    else {
        res.status(404).json({message: "User is not an Admin" });
        return;
    }
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}

module.exports = adminMiddleware;