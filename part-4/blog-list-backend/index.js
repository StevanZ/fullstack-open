require('dotenv').config();
const http = require('http');
const express = require('express');
const config = require('./utils/config');
const app = require('./app');

const server = http.createServer(app);

app.use(express.json());

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
