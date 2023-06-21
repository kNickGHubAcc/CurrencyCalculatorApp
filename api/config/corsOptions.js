const allowedOrigins = require('./allowedOrigins');

// Ορίζει τον τρόπο με τον οποίο η εφαρμογή θα δέχεται ή θα απορρίπτει requests από origins (URL)
function originCallback(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
}

const corsOptions = {
    origin: originCallback,
    optionsSuccessStatus: 200
};

module.exports = corsOptions;