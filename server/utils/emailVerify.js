const nodemailer = require("nodemailer");

exports.sendVerifyEmail = async (userId, name, email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "chelseasuman1905@gmail.com",
        pass: "odkvruuylihnxgsb",
      },
    });

    const mailOptions = {
      from: "Online Learning Platform",
      to: email,
      subject: "For Email Verification",
      html:
        "<p>Hi " +
        name +
        ', Please click here to <a href="http://127.0.0.1:5000/verify?id=' +
        userId +
        '">Verify</a> your mail.</p>',
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
