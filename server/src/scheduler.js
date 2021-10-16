const { CronJob } = require('cron');
const { v4: uuidv4, v4 } = require('uuid');
const { Job } = require('./db');

const { jobScraper, getJobs } = require('./jobscraper/scraper');

console.log('starting');
const fetchRemoteJobs = new CronJob('* * * * *', async () => {
  console.log('fetching jobs');
  await jobScraper();
  const newJobs = getJobs();
  saveJobs(newJobs);
  // console.log('jobs:', newJobs);
});

const saveJobs = async (jobs) => {
  try {
    return await jobs.map(async (job) => {
      await Job.create({ ...job, id: v4() }, { ignoreDuplicates: true });
      console.log('inserting job');
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = fetchRemoteJobs;
