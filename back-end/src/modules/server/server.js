const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { handleError } = require('../middlewares');
const router = require('../router');

const app = express();

app.use(
  express.json(),
  cors(),
  helmet(),
);

app.use(express.static('public'));

app.use(router);
app.use(handleError);

module.exports = app;
