// server.js
const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/posts', postRoutes);
app.use('/ratings', ratingRoutes);
app.use('/user', userRoutes)

module.exports = app