const { CronJob } = require('cron');
const { latestJobs } = require('../mailer/mailer');
const { fetchJobs } = require('./scraperCron');

const remoteJobsCron = async () => {
  fetchCron.start();
  sendMailCron.start();
};

const fetchCron = new CronJob('0 10,17 * * *', async () => {
  await fetchJobs();
});

const sendMailCron = new CronJob('0 10,17 * * *', async () => {
  console.log('sending email');
  await latestJobs(process.env.MOCK_EMAIL, process.env.MOCK_PASSWORD);
});
module.exports = { remoteJobsCron };
