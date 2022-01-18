const router = require('express').Router();

const Controller = require('./session.controller');

router.post('/', async (req, res) => {
  const { name, email, token, role, id } = await Controller.create(req.body);
  res.status(200).json({ name, email, token, role, id });
});

module.exports = router;
