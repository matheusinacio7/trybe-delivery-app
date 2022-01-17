const router = require('express').Router();

const Controller = require('./sale.controller');

router.post('/', async (req, res) => {
  const sale = await Controller.create(req.body);
  res.status(201).json({ sale });
});

module.exports = router;
