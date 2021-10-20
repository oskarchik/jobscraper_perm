const router = require('express').Router();

const { authenticateToken } = require('../../middlewares/auth.middleware');
const { allJobs, latestJobs, addJobs, updateJob, deleteJob } = require('../../controllers/jobs.controller');

router.get('/latestsjobs', authenticateToken, latestJobs);

router.get('/alljobs', authenticateToken, allJobs);

router.post('/', addJobs);

router.put('/:jobId', authenticateToken, updateJob);

router.delete('/:jobId', authenticateToken, deleteJob);

module.exports = router;
