const router = require('express').Router();

const Controller = require('./session.controller');

router.post('/', async (req, res) => {
  const { token } = await Controller.create(req.body);
  res.status(200).json({ token });
});

module.exports = router;
