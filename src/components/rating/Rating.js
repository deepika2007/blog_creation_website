import React, { useState } from 'react';
import { ratePost } from '../../api/api';
import { Rating } from 'react-simple-star-rating'
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from '@mui/material';

function RatingSection({ postId, isOpen, handleClose }) {
  const [rateCount, setCount] = useState(0)
  const handleRating = async (rate) => {
    setCount(rate)
  }

  const submitRate = async () => {
    await ratePost({ post_id: postId, rating: rateCount });
    handleClose()
  }

  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index)

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Add rating</DialogTitle>
      <DialogContent>
        <Rating
          aria-label={`Rate ${rateCount} star`}
          data-testid={`star-${rateCount}`}
          onClick={handleRating}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onPointerMove={onPointerMove}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" onClick={() => submitRate()} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>

    </Dialog>
  );
}

export default RatingSection;
