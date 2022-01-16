const router = require('express').Router();

const Controller = require('./router.controller');

router.get('/', async (_req, res) => {
  const { products } = await Controller.getAll();
  res.status(200).json({ products });
});

module.exports = router;
