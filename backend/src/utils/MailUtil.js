const mailer = require("nodemailer")
require("dotenv").config()

const mailSend = async (to, subject, htmlContent) => {

  try {

    const transporter = mailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,   // sender email
      to: to,                         // receiver email
      subject: subject,
      html: htmlContent               // 🔥 send HTML
    }

    const mailResponse = await transporter.sendMail(mailOptions)

    console.log("Email sent:", mailResponse.response)

    return mailResponse

  } catch (error) {

    console.log("Email error:", error)

  }

}

module.exports = mailSend