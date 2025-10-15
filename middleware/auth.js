// middleware/auth.js - API Key Authentication
const dotenv = require('dotenv');
dotenv.config();

function authenticate(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    const error = new Error('Unauthorized: Invalid or missing API key');
    error.status = 401;
    return next(error);
  }
  next();
}

module.exports = { authenticate };
