const axios = require('axios').default;
const { techFilter } = require('../utils/techFilter');
const { sendMail } = require('./nodemailer');

const latestJobs = async (email, password) => {
  await axios
    .post(
      'http://localhost:8000/api/auth/login',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      const token = res.data.accessToken;
      return axios.get('http://localhost:8000/api/jobs/latestsjobs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    })
    .then(async (response) => {
      return await response.data;
    })
    .then(async (jobs) => await displayTable(jobs))
    .then((table) => sendMail(table))
    .catch((err) => console.log(err));
};
// latestJobs(process.env.MOCK_EMAIL, process.env.MOCK_PASSWORD);

const displayTable = async (jobs) => {
  let table = `<h1>These are the job collected today from your database!!!</h1>
  <table style="width: 100%;
                max-width: 100%;
                margin-bottom: 2rem;
                background-color: #fff;
                border-spacing:1;           
                border-collapse:collapse;">
     <thead>
      <tr style="background-color:#36304a;">

        <th style="width:18%;text-align: left;padding: 1.6rem;vertical-align: top;border-top: 0;color:#fff;">
          <span style="font-size:20px;">TITLE</span>
        </th>
    
        <th style="width:18%;text-align: left;padding: 1.6rem;vertical-align: top;border-top: 0;color:#fff;">
          <span style="font-size:20px;">COMPANY</span>
        </th>
    
        <th style="width:18%;text-align: left;padding: 1.6rem;vertical-align: top;border-top: 0;color:#fff;">
          <span style="font-size:20px;">TECHNOLOGIES</span>
        </th>

        <th style="width:18%;text-align: left;padding: 1.6rem;vertical-align: top;border-top: 0;color:#fff;">
          <span style="font-size:20px;">LINK</span>
        </th>

        <th style="width:18%;text-align: left;padding: 1.6rem;vertical-align: top;border-top: 0;color:#fff;">
          <span style="font-size:20px;">DATE</span>
        </th>
      </tr>
    </thead>
    <tbody>`;
  jobs.forEach((job, i) => {
    const techs = job.technologies.filter((item) => techFilter.includes(item));
    if (i % 2 === 0) {
      table += `<tr style="background-color:#f5f5f5;">`;
    }

    table += `
      <td style="width:18%;text-align: left;padding: 1.6rem;vertical-align: top;border-top: 0;color:#808080;">
        <span style="font-size:20px;">${job.title}</span>
      </td>
    `;

    table += `
      <td style="width:18%;text-align: left;padding: 1.6rem;vertical-align: top;border-top: 0;color:#808080;">
        <span style="font-size:20px;">${job.company}</span>
      </td>
    `;

    table += `
      <td style="width:18%;text-align: left;padding: 1.6rem;vertical-align: top;border-top: 0;color:#808080;">
        <span style="font-size:20px;">${techs}</span>
      </td>
    `;

    table += `
      <td style="width:18%;text-align: left;padding: 1.6rem;vertical-align: top;border-top: 0;color:#808080;">
        <span style="font-size:20px;">${job.job_link}</span>
      </td>
    `;

    table += `
      <td style="width:18%;text-align: left;padding: 1.6rem;vertical-align: top;border-top: 0;color:#808080;">
        <span style="font-size:20px;">${job.date}</span>
      </td>
    `;
    table += `</tr>`;
  });
  table += `</tbody></table>`;

  return table;
};

module.exports = {
  latestJobs,
};
