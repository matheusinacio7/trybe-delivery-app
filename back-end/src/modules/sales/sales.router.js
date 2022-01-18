const router = require('express').Router();

const Controller = require('./sales.controller');
const { validateToken } = require('../middlewares');

router.post('/', validateToken, async (req, res) => {
  const sale = await Controller.create({
    userId: res.locals.user.id,
    ...req.body,
  });
  res.status(201).json({ sale });
});

module.exports = router;
