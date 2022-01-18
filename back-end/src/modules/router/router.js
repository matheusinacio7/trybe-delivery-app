const router = require('express').Router();

const userRouter = require('../user').router;
const productsRouter = require('../products').router;
const salesRouter = require('../sales').router;

router.use('/user', userRouter);
router.use('/products', productsRouter);
router.use('/sales', salesRouter);

module.exports = router;
