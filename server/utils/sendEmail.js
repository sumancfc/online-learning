const nodemailer = require("nodemailer");

exports.sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "Online Learning Platform",
      to: email,
      subject: subject,
      html: message,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email has been sent:-", info.response);
        return res.json({ message: "Email has been sent" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
