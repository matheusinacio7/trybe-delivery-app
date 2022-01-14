const router = require('express').Router();

const Controller = require('./user.controller');
const sessionRouter = require('./session').router;

router.use('/session', sessionRouter);

router.post('/', async (req, res) => {
  Controller.createAndLogin(req.body)
    .then(({ token }) => res.status(201).json({ token }));
});

module.exports = router;
