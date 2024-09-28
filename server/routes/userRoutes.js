const express = require('express');
const router = express.Router();
const { authenticate, getProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/auth', authenticate);
router.get('/', auth, getProfile);

module.exports = router;
