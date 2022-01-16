const router = require('express').Router();

const userRouter = require('../user').router;
const productsRouter = require('../products').router;

router.use('/user', userRouter);
router.use('/products', productsRouter);

module.exports = router;
