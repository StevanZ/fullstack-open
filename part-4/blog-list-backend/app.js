const blogsRouter = require('./controlers/blogs');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('./utils/config');
const cors = require('cors');
const { info, error } = require('./utils/logger');
const {
  requestLogger,
  unknownEndpoint,
  errorHandler
} = require('./utils/middleware');

info('connecting to mongo...');
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    info('connected to mongoDB...');
  })
  .catch((err) => {
    error('problem connecting to mongoDB: ', err);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/api/blogs', blogsRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
