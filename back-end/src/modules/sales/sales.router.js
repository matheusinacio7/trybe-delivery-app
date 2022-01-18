const router = require('express').Router();

const Controller = require('./sales.controller');
const { validateToken } = require('../middlewares');

router.get('/', validateToken, async (req, res) => {
  const sales = await Controller.get({
    userId: res.locals.user.id,
    userRole: res.locals.user.role,
    searchByCustomer: req.query.customer,
  });

  res.status(200).json({ sales });
});

router.post('/', validateToken, async (req, res) => {
  const sale = await Controller.create({
    userId: res.locals.user.id,
    ...req.body,
  });
  res.status(201).json({ sale });
});

module.exports = router;
