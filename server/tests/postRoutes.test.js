// tests/postRoutes.test.js
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('POST /posts', () => {
  it('should create a new post', async () => {
    const res = await request(app).post('/posts').send({
      user_id: '64c1b0b2b2e4f234b2bcdbf7',
      title: 'My First Post',
      content: 'This is the content of my first post.',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'My First Post');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
