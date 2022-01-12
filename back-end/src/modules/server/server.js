const express = require('express');

const { handleError } = require('../middlewares');
const router = require('../router');

const app = express();

app.use(express.json());

app.use(router);
app.use(handleError);

module.exports = app;
