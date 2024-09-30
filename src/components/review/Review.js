import React, { useEffect, useState, useCallback } from 'react';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { Rating } from 'react-simple-star-rating';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getRatings } from '../../api/api'; 

// RatingItem Component for individual rating
const RatingItem = ({ rate }) => (
    <Box sx={{ mt: 2, border: '1px solid', borderRadius: '20px', padding: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountCircleIcon sx={{ fontSize: '50px' }} />
            <Typography variant='h6' sx={{ pl: 1 }}>{rate?.user_id?.username}</Typography>
        </Box>
        <Rating initialValue={parseInt(rate?.rating)} readonly={true} size={20} />
    </Box>
);

const PostLayout = ({ data, handleDialogClose }) => {
    const [ratings, setRatings] = useState([]);
    const fetchRatings = useCallback(async (id) => {
        const result = await getRatings(id);
        if (result) setRatings(result);
    }, []);

    useEffect(() => {
        if (data?.post?._id) {
            fetchRatings(data?.post?._id);
        }
    }, [data?.post?._id]);

    return (
        <Dialog open={data?.isOpen} onClose={handleDialogClose} maxWidth={'lg'}>
            <DialogContent>
                <Typography sx={{ fontSize: '25px', fontWeight: "bold" }}>
                    {data?.post?.title || 'Untitled'}
                </Typography>
                <Typography variant="h5">
                    {data?.post?.content || 'No content available'}
                </Typography>

                {ratings?.map((rate, index) => (
                    <RatingItem key={index} rate={rate} />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PostLayout;
