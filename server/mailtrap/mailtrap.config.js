// const { MailtrapClient } = require("mailtrap");
// const TOKEN = process.env.MAILTRAP_TOKEN;

// const mailtrapClient = new MailtrapClient({
//   token: TOKEN,
// });

// const sender = {
//   email: "mailtrap@demomailtrap.com",
//   name: "TexxeSchool",
// };

// module.exports = { mailtrapClient, sender };
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});
module.exports = { transporter };
