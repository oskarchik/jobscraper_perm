const axios = require('axios').default;
const { techFilter } = require('../utils/techFilter');
const { sendMail } = require('./nodemailer');
const { FRONT_URL } = process.env;

const BASE_URL_LOGIN =
  process.env.NODE_ENV === 'production' ? `${FRONT_URL}}/api/auth/login` : 'http://localhost:8000/api/auth/login';
const BASE_URL_JOBS =
  process.env.NODE_ENV === 'production'
    ? `${FRONT_URL}/api/jobs/latestsjobs`
    : 'http://localhost:8000/api/jobs/latestsjobs';

const latestJobs = async (email, password) => {
  try {
    const responseLogin = await axios.post(
      BASE_URL_LOGIN,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const token = responseLogin.data.accessToken;

    const responseLatestJobs = await axios.get(BASE_URL_JOBS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    if (responseLatestJobs.data.msg) {
      sendMail(responseLatestJobs?.data?.msg);
    }
    sendMail(displayTable(responseLatestJobs?.data?.results?.jobs?.rows));
  } catch (error) {
    console.log(error);
  }
};

const displayTable = (jobs) => {
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
  jobs?.forEach((job, i) => {
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

  table += `<p style="text-align: center; margin: 0 auto; font-size:20px">Check all the jobs in <a href='jobfindr.tk'>JobFindr</a></p>`;

  return table;
};

module.exports = {
  latestJobs,
};
