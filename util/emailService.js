const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendDoctorRegistrationEmail = async (toEmail, doctorName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Doctor Registration Successful",
    text: `Hello Dr. ${doctorName},\n\nYou have been successfully registered in our system.\n\nRegards,\nMediz Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", toEmail);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = sendDoctorRegistrationEmail;
