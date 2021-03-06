const puppeteer = require('puppeteer');
const { techFilter } = require('../../utils/techFilter');

const jobs = [];

const jobScraper = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();

    await page.goto('https://ticjob.es/esp/busqueda', { timeout: 0 });

    await latestJobs(page);

    await page.close();
  } catch (error) {
    console.log('error in jobScraper function:', error);
  }
};

const getJobs = () => {
  return jobs;
};

async function addJob(title, company, technologies, job_link, date) {
  if (jobs) {
    const job = { title, company, technologies, job_link, date };
    jobs.push(job);
  }
}

async function getPropertyValue(element, propertyName) {
  const property = await element.getProperty(propertyName);
  return await property.jsonValue();
}

async function latestJobs(page) {
  const jobsBody = await page.$('.search-result-body');
  const jobsCard = await jobsBody.$$('li');

  const cardsMapping = jobsCard.map(async (card) => {
    //JOBTITLE==========================
    const jobTitleElement = await card.$('.job-title');
    let jobTitle = '';
    if (jobTitleElement) {
      jobTitle = await getPropertyValue(jobTitleElement, 'innerText');

      //DATE============================
      const dateElement = await card.$('.date-field p');
      let date = '';
      if (dateElement) {
        date = await getPropertyValue(dateElement, 'innerText');
      }

      //LINK=============================
      const jobLinkElement = await card.$('.job-card-header a');
      let job_link = '';
      if (jobLinkElement) {
        job_link = await getPropertyValue(jobLinkElement, 'href');
      }

      //COMPANY==========================
      const companyElement = await card.$('.job-card-label-header h3');
      let company = '';
      if (companyElement) {
        company = await getPropertyValue(companyElement, 'innerText');
      }

      //TAGS=================================
      const tags = await card.$$('.job-tag');
      let technologies = [];
      if (tags) {
        technologies = await Promise.all(
          tags.map(async (tag) => {
            return (await getPropertyValue(tag, 'innerText')).toLowerCase();
          })
        );
      }
      //VALIDATES JOB ACCORDING FILTER=========================
      if (technologies.some((item) => techFilter.includes(item))) {
        await addJob(jobTitle, company, technologies, job_link, date);
      }
    }
  });
  await Promise.all(cardsMapping);
}

module.exports = { jobScraper, getJobs };
