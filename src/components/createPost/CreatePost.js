import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createPost } from '../../api/api';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

function CreatePostDialog({ open, handleClose }) {
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
    }),
    onSubmit: async (values) => {
      await createPost(values);
      handleClose(); // Close the dialog after submission
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Create Post</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            required
            margin="dense"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Content"
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
            required
            margin="dense"
            variant="outlined"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Create Post
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CreatePostDialog;