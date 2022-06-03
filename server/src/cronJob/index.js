const { CronJob } = require('cron');
const { latestJobs } = require('../mailer/mailer');
const { fetchJobs } = require('./scraperCron');

const remoteJobsCron = async () => {
  fetchCron.start();
  sendMailCron.start();
};
// 0 10,17 * * *
const fetchCron = new CronJob('* * * * *', async () => {
  await fetchJobs();
});
// 10 17 * * *
const sendMailCron = new CronJob('* * * * *', async () => {
  console.log('sending email');
  await latestJobs(process.env.MOCK_EMAIL, process.env.MOCK_PASSWORD);
});
module.exports = { remoteJobsCron };
