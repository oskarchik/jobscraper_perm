const { CronJob } = require('cron');
const { v4: uuidv4, v4 } = require('uuid');
const { Job } = require('../../db');

const { jobScraper, getJobs } = require('../jobscraper/scraper');

console.log('starting');
const fetchJobs = async () => {
  try {
    console.log('fetching jobs');
    await jobScraper();
    const newJobs = getJobs();
    await saveJobs(newJobs);

    return newJobs;
  } catch (error) {
    console.log(error);
  }
};

const saveJobs = async (jobs) => {
  try {
    return await Promise.all(
      jobs.map(async (job) => {
        return await Job.create({ ...job, id: v4() }, { ignoreDuplicates: true });
      })
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { fetchJobs };
