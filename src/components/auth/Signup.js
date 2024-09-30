import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';

// Validation schema using Yup
const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email_id: Yup.string().email('Invalid email address').required('Email is required'),
    mobile_no: Yup.string()
        .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),
});

function SignupComponent({ validateUser }) {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            email_id: '',
            mobile_no: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            const result = await signup(values);
            if (result?.success) {
                localStorage.setItem('blog_token', result?.token);
                setTimeout(() => {
                    console.log('call')
                    navigate('/')
                    validateUser()
                }, 1000)
            }
        },
    });

    return (
        <Box sx={{
            width: '100%',
            height: "100vh",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    minWidth: 400,
                    gap: 2,
                }}
            >
                <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
                    Sign Up
                </Typography>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                >
                    <TextField
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        required
                    />
                    <TextField
                        name="email_id"
                        label="Email"
                        type="email"
                        value={formik.values.email_id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email_id && Boolean(formik.errors.email_id)}
                        helperText={formik.touched.email_id && formik.errors.email_id}
                        required
                    />
                    <TextField
                        name="mobile_no"
                        label="Mobile Number"
                        value={formik.values.mobile_no}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.mobile_no && Boolean(formik.errors.mobile_no)}
                        helperText={formik.touched.mobile_no && formik.errors.mobile_no}
                        required
                    />
                    <Button type="submit" variant="contained" size="large" color="primary" fullWidth>
                        Sign Up
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default SignupComponent;
