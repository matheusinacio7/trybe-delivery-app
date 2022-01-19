const router = require('express').Router();

const Controller = require('./sales.controller');
const { validateToken } = require('../middlewares');

router.get('/:id', validateToken, async (req, res) => {
  const sale = await Controller.getDetailed({
    userId: res.locals.user.id,
    userRole: res.locals.user.role,
    saleId: req.params.id,
  });

  res.status(200).json({ sale });
});

router.get('/', validateToken, async (req, res) => {
  const sales = await Controller.getMany({
    userId: res.locals.user.id,
    userRole: res.locals.user.role,
    searchByCustomer: req.query.customer,
    searchBySeller: req.query.seller,
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

router.put('/:id', validateToken, async (req, res) => {
  const { message } = await Controller.update({
    userId: res.locals.user.id,
    userRole: res.locals.user.role,
    saleId: req.params.id,
    update: req.body,
  });
  res.status(200).json({ message });
});

module.exports = router;
