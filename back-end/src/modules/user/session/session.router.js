const router = require('express').Router();

const Controller = require('./session.controller');

router.post('/', async (req, res) => {
  console.log(req.body);
  const { token } = await Controller.create(req.body);
  res.status(201).json({ token });
});

module.exports = router;
