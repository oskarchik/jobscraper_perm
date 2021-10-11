const { CronJob } = require('cron');

const { jobScraper, getJobs } = require('./jobscraper/scraper');

console.log('starting');
const fetchRemoteJobs = new CronJob('0 11,19 * * *', async () => {
  console.log('fetching jobs');
  await jobScraper();
  console.log('jobs:', getJobs());
});
fetchRemoteJobs.start();
