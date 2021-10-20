const { CronJob } = require('cron');
const { jobScraper, getJobs } = require('../jobscraper/scraper');
const { latestJobs } = require('../mailer/mailer');
const saveJobs = require('../scheduler');
const { fetchJobs } = require('./scraperCron');

const remoteJobsCron = async () => {
  fetchCron.start();
  sendMailCron.start();
};

// const fetchCron = new CronJob('31 15  * * *', async () => {
const fetchCron = new CronJob('* *  * * *', async () => {
  await fetchJobs();
});

// const sendMailCron = new CronJob('35 15 * * *', async () => {
const sendMailCron = new CronJob('* * * * *', async () => {
  await latestJobs(process.env.MOCK_EMAIL, process.env.MOCK_PASSWORD);
});
module.exports = { remoteJobsCron };
