// const { mailtrapClient, sender } = require("./mailtrap.config.js");
// const {
//   VERIFICATION_EMAIL_TEMPLATE,
//   WELCOME_EMAIL_TEMPLATE,
//   PASSWORD_RESET_REQUEST_TEMPLATE,
//   PASSWORD_RESET_SUCCESS_TEMPLATE,
// } = require("./emailTemplates.js");

// const sendVerificationEmail = async (email, verificationToken) => {
//   const recipient = [{ email }];
//   console.log("Verification file", recipient);
//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Email Verification",
//       html: VERIFICATION_EMAIL_TEMPLATE.replace(
//         "{verificationCode}",
//         verificationToken
//       ),
//       category: "Email Verification",
//     });
//     console.log("Email sent successfully", response);
//   } catch (err) {
//     console.log("Error sending email:", err);
//   }
// };

// const sendWelcomeEmail = async (email, name) => {
//   const recipient = [{ email }];
//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Welcome to Our Platform",
//       html: WELCOME_EMAIL_TEMPLATE.replace("{user_name}", name),
//       category: "Welcome Email",
//     });
//     console.log("Email sent successfully", response);
//   } catch (err) {
//     console.log("Error sending email:", err);
//   }
// };
// const sendPasswordResetEmail = async (email, resetToken) => {
//   const recipient = [{ email }];
//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Password Reset",
//       html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
//         "{resetURL}",
//         `http://localhost:3000/reset-password/${resetToken}`
//       ),
//       category: "Password Reset",
//     });
//   } catch (err) {
//     console.log("Error sending email:", err);
//   }
// };
// const sendResetSuccessEmail = async (email) => {
//   const recipient = [{ email }];
//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Password Reset Success",
//       html: PASSWORD_RESET_SUCCESS_TEMPLATE,
//       category: "Password Reset Success",
//     });
//   } catch (err) {
//     console.log("Error sending email:", err);
//   }
// };
// module.exports = {
//   sendVerificationEmail,
//   sendWelcomeEmail,
//   sendPasswordResetEmail,
//   sendResetSuccessEmail,
// };
const { transporter } = require("./mailtrap.config.js");
const {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./emailTemplates.js");

const sendVerificationEmail = async (recipient, verificationToken) => {
  try {
    const response = await transporter.sendMail({
      from: {
        name: "TexxeSchool",
        address: process.env.USER_EMAIL,
      },
      to: recipient,
      subject: "Email Verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (err) {
    console.log("Error sending email:", err);
  }
};

const sendWelcomeEmail = async (recipient, name) => {
  try {
    const response = await transporter.sendMail({
      from: {
        name: "TexxeSchool",
        address: process.env.USER_EMAIL,
      },
      to: recipient,
      subject: "Welcome to Our Platform",
      html: WELCOME_EMAIL_TEMPLATE.replace("{user_name}", name),
      category: "Welcome Email",
    });
    console.log("Email sent successfully", response);
  } catch (err) {
    console.log("Error sending email:", err);
  }
};

const sendPasswordResetEmail = async (recipient, resetToken) => {
  try {
    const response = await transporter.sendMail({
      from: {
        name: "TexxeSchool",
        address: process.env.USER_EMAIL,
      },
      to: recipient,
      subject: "Password Reset",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetURL}",
        `http://localhost:3000/reset-password/${resetToken}`
      ),
      category: "Password Reset",
    });
  } catch (err) {
    console.log("Error sending email:", err);
  }
};

const sendResetSuccessEmail = async (recipient) => {
  try {
    const response = await transporter.sendMail({
      from: {
        name: "TexxeSchool",
        address: process.env.USER_EMAIL,
      },
      to: recipient,
      subject: "Password Reset Success",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset Success",
    });
  } catch (err) {
    console.log("Error sending email:", err);
  }
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
};
