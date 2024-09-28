// routes/ratingRoutes.js
const express = require('express');
const { submitRating, getPostRatings } = require('../controllers/ratingController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/',auth, submitRating);
router.get('/:postId', getPostRatings);

module.exports = router;
