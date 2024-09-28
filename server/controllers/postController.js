const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({ user_id: req?.user?._id, title, content });
    await post.save();
    res.status(201).json({ data: post, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: 'ratings', // collection name of ratings
          localField: '_id',
          foreignField: 'post_id',
          as: 'ratings'
        }
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: "$ratings" }, 0] },
              then: { $divide: [{ $sum: "$ratings.rating" }, { $size: "$ratings" }] },
              else: 0
            }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          title: 1,
          content: 1,
          user: { username: 1 },
          ratings: 1,
          averageRating: 1
        }
      }
    ]);
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts with ratings', error });
  }
};
