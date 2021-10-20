const { CronJob } = require('cron');
const { latestJobs } = require('../mailer/mailer');
const { fetchJobs } = require('./scraperCron');

const remoteJobsCron = async () => {
  fetchCron.start();
  sendMailCron.start();
};

const fetchCron = new CronJob('* *  * * *', async () => {
  await fetchJobs();
});

const sendMailCron = new CronJob('* * * * *', async () => {
  await latestJobs(process.env.MOCK_EMAIL, process.env.MOCK_PASSWORD);
});
module.exports = { remoteJobsCron };
