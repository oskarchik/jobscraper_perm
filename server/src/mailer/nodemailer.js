const nodemailer = require('nodemailer');

async function sendMail(table) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'osc.dev.test@gmail.com',
      pass: 'Abby20Nolan15',
    },
  });

  let info = transporter.sendMail(
    {
      from: '"Oscar " <osc.dev.test@gmail.com>',
      to: 'osc.dev.test@gmail.com',
      subject: `Job offers fot today ${new Date().toLocaleDateString()}`,
      text: 'These are the job collected today from your database!!!',
      html: table,
    },
    function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    }
  );
}

module.exports = { sendMail };
