const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, INBOX_EMAIL } = process.env;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

async function sendMail(data) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'osanzce@gmail.com',
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `"Oscar " <${process.env.INBOX_EMAIL}>`,
      to: INBOX_EMAIL,
      subject: `Today's job offers ${new Date().toLocaleDateString()}`,
      text: 'These are the job collected today from your database!!!',
      html: data,
    };

    const result = await transport.sendMail(mailOptions);
    console.log('success');
    return result;
  } catch (error) {
    console.log('error in sendmail', error);
    return error;
  }
}

module.exports = { sendMail };
