const allowedOrigins = require('../config/allowedOrigins');

//Δυνατότητα του client να στέλνει credentials(π.χ cookies) στον server (εφόσον ο server τα δέχεται)
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials