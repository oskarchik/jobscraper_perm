const router = require('express').Router();

const apiJobsRouter = require('./api/jobs.routes');
const apiAuthRouter = require('./api/auth.routes');

// const authenticateToken = require('../middlewares/auth.middleware')

router.use('/jobs', apiJobsRouter);
router.use('/auth', apiAuthRouter);

module.exports = router;
