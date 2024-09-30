import React, { useEffect, useState } from 'react';
import { getPosts } from '../../api/api';
import { Rating } from 'react-simple-star-rating';
import bgImage from '../../assets/images/bg_img.jpg';
import { Button, Card, CardContent, CardActions, Typography, Box, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreatePostDialog from '../createPost/CreatePost.js';
import PostLayout from '../review/Review';
import RatingSection from '../rating/Rating'

function PostList() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [reviewModal, setReviewModal] = useState({
    isOpen: false,
    post: null
  })

  const [ratingModal, setRatingModal] = useState({
    isOpen: false,
    postId: null
  })

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    fetchPosts()
  };

  const handleReviewOpen = (post) => setReviewModal((prev) => ({ ...prev, isOpen: true, post }))
  const handleReviewClose = () => setReviewModal((prev) => ({ ...prev, isOpen: false, post: null }))

  const handleRatingOpen = (post) => setRatingModal((prev) => ({ ...prev, isOpen: true, postId: post }))
  const handleRatingClose = () => {
    setRatingModal((prev) => ({ ...prev, isOpen: false, post: null }))
    fetchPosts()
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const data = await getPosts();
    setPosts(data);
  }
  console.log('============', posts)
  return (
    <Box sx={{ maxWidth: '90%', mx: 'auto', mt: 4 }} data-testid="post-list">
      <Button variant="contained" color="primary" size='large' onClick={handleOpen} sx={{ mb: 3 }}>
        Create Post
      </Button>

      <Box sx={{ display: "flex", gap: 5, flexWrap: 'wrap', }}>
        {posts?.map((post) => (
          <Card
            key={post?._id}
            sx={{
              mb: 3,
              minWidth: '500px',
              maxWidth: '500px',
              minHeight: '300px',
              position: 'relative',
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              overflow: 'hidden',
              '&:hover .overlay': {
                opacity: 0.7,
                visibility: 'visible',
              },
            }}
          >
            <CardContent sx={{ width: '50%', minHeight: '200px' }}>
              <Box
                sx={{
                  minWidth: '460px',
                  width: '460px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 4,
                  textOverflow: 'ellipsis',
                  maxHeight: '105px',
                  height: '105px',
                }}
              >
                <Typography variant="h3" component="div" sx={{ color: 'white' }}>
                  {post?.title}
                </Typography>
              </Box>

              <Box
                sx={{
                  minWidth: '460px',
                  width: '460px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 4,
                  textOverflow: 'ellipsis',
                  maxHeight: '305px',
                  height: '145px'
                }}
              >
                <Typography
                  variant="h5"
                  color="textSecondary"
                  sx={{ mt: 2, color: 'white' }}
                >
                  {post?.content}
                </Typography>
              </Box>
            </CardContent>

            <CardActions>
              <Rating
                initialValue={parseInt(post?.averageRating)}
                readonly={true}
                size={30}
                emptyColor="white"
              />
            </CardActions>
            <Box
              className="overlay"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0,
                visibility: 'hidden',
                transition: 'opacity 0.3s ease, visibility 0.3s ease',
              }}
            >
              <Box sx={{ display: 'flex', gap: 2, alignItems: "center" }}>
                <IconButton
                  onClick={() => handleReviewOpen(post)}
                  sx={{ color: 'white' }}              >
                  <VisibilityIcon fontSize="large" />
                </IconButton>

                <Typography
                  onClick={() => handleRatingOpen(post?._id)}
                  sx={{ cursor: 'pointer', fontSize: "20px", color: 'white' }}
                >Add Rating</Typography>
              </Box>
            </Box>
          </Card>
        ))
        }
      </Box >
      {open && < CreatePostDialog open={open} handleClose={handleClose} />}
      {reviewModal?.isOpen && <PostLayout data={reviewModal} handleDialogClose={handleReviewClose} />}
      {ratingModal?.isOpen && <RatingSection postId={ratingModal?.postId} isOpen={ratingModal?.isOpen} handleClose={handleRatingClose} />}

    </Box >
  );
}

export default PostList;
