const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const { initialBlogs, blogsInDb } = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany();
  const blogsObj = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogsObj.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('there are two blogs in data base', async () => {});
