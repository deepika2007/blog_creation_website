const Rating = require('../models/Rating');

// Submit a rating
exports.submitRating = async (req, res) => {
  try {
    const { post_id, rating } = req.body;
    const newRating = new Rating({ user_id: req?.user?._id, post_id, rating });
    await newRating.save();
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting rating', error });
  }
};

// Get ratings for a post and calculate the average rating
exports.getPostRatings = async (req, res) => {
  try {
    const { postId } = req.params;
    const ratings = await Rating.find({ post_id: postId }).populate('user_id');
    res.status(200).json({ success: true, data: ratings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ratings', error });
  }
};
