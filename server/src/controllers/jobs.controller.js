const { Op } = require('sequelize');
const { v4: uuidv4, v4 } = require('uuid');
const { Job } = require('../db');

const latestJobs = async (req, res, next) => {
  const jobs = await Job.findAll({
    where: {
      created_at: {
        [Op.lt]: Date.now(),
        [Op.gt]: Date.now() - 24 * 60 * 60 * 1000,
      },
    },
  });

  if (jobs.length) {
    return res.json(jobs);
  } else {
    return res.send({ msg: 'no new jobs' });
  }
};

const allJobs = async (req, res, next) => {
  const jobs = await Job.findAll();
  res.json(jobs);
};

const addJobs = async (req, res, next) => {
  const { title, company, technologies, job_link, date } = req.body;
  const id = v4();
  const newJob = Job.create({ id, title, company, technologies, job_link, date });
  res.json(newJob);
};

const updateJob = async (req, res, next) => {
  const { applied } = req.body;
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
};

const deleteJob = async (req, res, next) => {
  const id = req.params.jobId;
  try {
    await Job.destroy({
      where: { id },
    });
    return res.json({ message: 'job deleted' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  latestJobs,
  allJobs,
  addJobs,
  updateJob,
  deleteJob,
};
