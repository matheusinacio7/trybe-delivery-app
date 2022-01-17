const router = require('express').Router();

const Controller = require('./user.controller');
const sessionRouter = require('./session').router;

router.use('/session', sessionRouter);

router.post('/', async (req, res) => {
  const { token } = await Controller.createAndLogin(req.body);
  res.status(201).json({ token });
});

module.exports = router;
