const { Op, where } = require('sequelize');
const { v4: uuidv4, v4 } = require('uuid');
const { Job } = require('../db');

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/jobs' : 'http://localhost:8000/api/jobs';

const latestJobs = async (req, res, next) => {
  const page = parseInt(req.query.page) | 0;
  const limit = 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const now = Date.now();
  const lastDay = Date.now() - 24 * 60 * 60 * 1000;
  //
  try {
    const jobs = await Job.findAndCountAll({
      where: {
        created_at: {
          [Op.lt]: now,
          [Op.gt]: lastDay,
        },
      },
      order: [['createdAt', 'DESC']],
      limit: limit,
      offset: page * limit,
    });

    const results = { info: { pages: Math.ceil(jobs.count / limit), currentPage: page + 1 } };

    if (startIndex >= 0 && startIndex < jobs.count) {
      results.info.previous = {
        page: page - 1,
        link: `${BASE_URL}/latestjobs?page=${page - 1}`,
      };
    }
    if (endIndex + 10 < jobs.count) {
      results.info.next = {
        page: page + 1,
        link: `${BASE_URL}/latestjobs?page=${page + 1}`,
      };
    }
    if (jobs.rows.length) {
      results.results = { jobs };

      return res.json(results);
    } else {
      return res.send({ msg: 'No jobs published yesterday sorry' });
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const allJobs = async (req, res, next) => {
  const page = parseInt(req.query.page) | 0;
  const limit = 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const jobs = await Job.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit: limit,
    offset: page * limit,
  });

  const results = { info: { pages: Math.ceil(jobs.count / limit), currentPage: page + 1 } };

  if (startIndex >= 0 && startIndex < jobs.count) {
    results.info.previous = {
      page: page - 1,
      link: `${BASE_URL}/alljobs?page=${page - 1}`,
    };
  }
  if (endIndex + 10 < jobs.count) {
    results.info.next = {
      page: page + 1,
      link: `${BASE_URL}/alljobs?page=${page + 1}`,
    };
  }

  results.results = {
    jobs,
  };

  return res.status(200).json(results);
};

const addJobs = async (req, res, next) => {
  const { title, company, technologies, job_link, date } = req.body;
  const id = v4();
  const newJob = Job.create({ id, title, company, technologies, job_link, date });
  res.json(newJob);
};

const updateJob = async (req, res, next) => {
  const { applied } = req.body;

  const id = req.params.jobId;

  try {
    const updatedJob = await Job.update(
      { applied },
      {
        where: {
          id,
        },
        returning: true,
        plain: true,
      }
    );

    return res.json({ success: `job ${req.params.jobId} updated`, job: updatedJob[1] });
  } catch (error) {
    return res.json({ error: `el error es ${error}` });
  }
};

const deleteJob = async (req, res, next) => {
  const id = req.body.jobs;

  if (!id) return res.status(422).json({ message: 'id parameter required' }); //length should be bigger than 2 in case of empty array

  try {
    const existingJob = await Job.findAll({ where: { id } });
    if (existingJob.length === 0) {
      return res.status(404), json({ message: 'job not found' });
    }

    await Job.destroy({
      where: { id },
    });
    return res.json({ message: 'job deleted' });
  } catch (error) {
    console.log(error);
  }
};

const searchJob = async (req, res, next) => {
  const { field } = req.params;
  const word = [req.params.word];

  const trueBool = word[0] === 'true';

  const page = parseInt(req.query.page) | 0;
  const limit = 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const whereStatement = {};

  field === 'technologies'
    ? (whereStatement.technologies = { [Op.contains]: word.map((w) => w.toLowerCase()) })
    : (whereStatement[`${field}`] = { [Op.iLike]: `%${word}%` });

  if (field === 'applied') {
    whereStatement[`${field}`] = trueBool;
  }

  try {
    const jobs = await Job.findAndCountAll({
      where: {
        [field]: whereStatement[`${field}`],
      },
      order: [['date', 'DESC']],
      limit: limit,
      offset: page * limit,
    });

    const results = { info: { pages: Math.ceil(jobs.count / limit), currentPage: page + 1 } };

    if (startIndex >= 0 && startIndex < jobs.count) {
      results.info.previous = {
        page: page - 1,
        link: `${BASE_URL}/filter/:field/:word?page=${page - 1}`,
      };
    }
    if (endIndex + 10 < jobs.count) {
      results.info.next = {
        page: page + 1,
        link: `${BASE_URL}/filter/:field/:word?page=${page + 1}`,
      };
    }
    results.results = {
      jobs,
    };

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
module.exports = {
  latestJobs,
  allJobs,
  addJobs,
  updateJob,
  deleteJob,
  searchJob,
};
