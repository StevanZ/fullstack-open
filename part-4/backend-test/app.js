const config = require('./utils/config');
const notesRouter = require('./controllers/notes');
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to mongoDB');
  })
  .catch((err) => {
    logger.error('error connecting to mongoDB: ', err.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
