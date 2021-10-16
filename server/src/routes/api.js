const router = require('express').Router();

const apiJobsRouter = require('./api/jobs.routes');
const apiAuthRouter = require('./api/auth.routes');

router.use('/jobs', apiJobsRouter);
router.use('/auth', apiAuthRouter);

module.exports = router;
