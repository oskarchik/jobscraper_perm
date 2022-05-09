const router = require('express').Router();

const { authenticateToken } = require('../../middlewares/auth.middleware');
const { allJobs, latestJobs, addJobs, updateJob, deleteJob, searchJob } = require('../../controllers/jobs.controller');
const { cacheInit } = require('../../middlewares/cache.middleware');

router.get('/latestsjobs', authenticateToken, cacheInit, latestJobs);

router.get('/alljobs', authenticateToken, cacheInit, allJobs);

router.post('/', authenticateToken, addJobs);

router.put('/:jobId', authenticateToken, updateJob);

router.delete('/', authenticateToken, deleteJob);

router.get('/filter/:field/:word?', authenticateToken, searchJob);

module.exports = router;
