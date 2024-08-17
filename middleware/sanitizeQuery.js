// Import the validator module to validate the input
const validator = require('validator');

// Import the BASE_URL, CACHE_TTL, COUNTRIES_SET constant from the config/constants.js file
const { COUNTRIES_SET } = require('../config/constants');


const sanitizeQuery = (req, res, next) => {
    // Sanitize all query parameters
    Object.keys(req.query).forEach((key) => {
        req.query[key] = validator.escape(req.query[key] || '');
    });

    // Validate 'country' query parameter if present
    if (req.query.country && !COUNTRIES_SET.has(req.query.country.toUpperCase())) {
        return res.status(400).json({ error: 'Invalid country name' });
    }

    next();
};

module.exports = sanitizeQuery;