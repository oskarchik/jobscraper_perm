const router = require('express').Router();
const { Op } = require('sequelize');
const { v4: uuidv4, v4 } = require('uuid');

const { Job } = require('../../db');
const { authenticateToken } = require('../../middlewares/auth.middleware');

router.get('/latestsjobs', async (req, res, next) => {
  const jobs = await Job.findAll({
    created_at: {
      [Op.lt]: new Date(),
      [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
    },
  });
  res.json(jobs);
});
router.get('/alljobs', authenticateToken, async (req, res, next) => {
  // console.log('req.user', req.user);
  const jobs = await Job.findAll();
  res.json(jobs);
});

router.post('/', async (req, res, next) => {
  const { title, company, technologies, job_link, date } = req.body;
  const id = v4();
  const newJob = Job.create({ id, title, company, technologies, job_link, date });
  res.json(newJob);
});

router.put('/:jobId', async (req, res, next) => {
  const { applied } = req.body;
  console.log(applied);
  try {
    await Job.update(
      { applied },
      {
        where: {
          id: req.params.jobId,
        },
      }
    );
    return res.json({ success: `job ${req.params.jobId} updated` });
  } catch (error) {
    return res.json({ error });
  }
});

router.delete('/:jobId', async (req, res, next) => {
  const id = req.params.jobId;
  try {
    await Job.destroy({
      where: { id },
    });
    return res.json({ message: 'job deleted' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
