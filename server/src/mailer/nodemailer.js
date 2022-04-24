const nodemailer = require('nodemailer');

async function sendMail(data) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.INBOX_EMAIL,
      pass: process.env.INBOX_PASSWORD,
    },
  });

  let info = transporter.sendMail(
    {
      from: `"Oscar " <${process.env.INBOX_EMAIL}>`,
      to: process.env.INBOX_EMAIL,
      subject: `Job offers fot today ${new Date().toLocaleDateString()}`,
      text: 'These are the job collected today from your database!!!',
      html: data,
    },
    function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log('success');
      }
    }
  );
}

module.exports = { sendMail };
