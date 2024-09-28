const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
require('dotenv').config()

const auth = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied.' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
        req.user = await userModel.findById(decoded.id);
        next();
    } catch (error) {
        if (error?.name === 'TokenExpiredError') {
            console.log('Token expired at:', error?.expiredAt);
            return res.status(401).json({ message: 'Token has expired.' });
        } else if (error?.name === 'JsonWebTokenError') {
            console.log('JWT verification failed:', error?.message);
            return res.status(400).json({ message: 'Invalid token.' });
        } else if (error?.name === 'NotBeforeError') {
            console.log('Token not active yet:', error?.date);
            return res.status(400).json({ message: 'Token not active yet.' });
        } else {
            console.error('Unexpected error during JWT verification:', error);
            return res.status(500).json({ message: 'Server error during authentication.' });
        }
        // res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = auth;
