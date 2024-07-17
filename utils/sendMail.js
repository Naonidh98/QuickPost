const nodemailer = require("nodemailer");

require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.GMAIL_HOST,

  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendMail = async (email, title, body) => {
  try {
    const info = await transporter.sendMail({
      from: `"SOCIAL_MEDIA_APP 👻" <${process.env.GMAIL_USER}>`, // sender address
      to: email, // list of receivers
      subject: title, // Subject line
      html: body, // html body
    });

    console.log("Mail send successfully !! 💬");

    return info;
  } catch (err) {
    console.log("Failed to send mail 💬👎");
    console.log("Error : ", err.message);
  }
};

module.exports = sendMail;
