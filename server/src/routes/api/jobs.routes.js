const router = require('express').Router();
const { Op } = require('sequelize');
const { v4: uuidv4, v4 } = require('uuid');

const { Job } = require('../../db');
const { authenticateToken } = require('../../middlewares/auth.middleware');

const { allJobs, latestJobs, addJobs, updateJob, deleteJob } = require('../../controllers/jobs.controller');

router.get('/latestsjobs', authenticateToken, latestJobs);

router.get('/alljobs', authenticateToken, allJobs);

router.post('/', addJobs);

router.put('/:jobId', authenticateToken, updateJob);

router.delete('/:jobId', authenticateToken, deleteJob);

module.exports = router;
