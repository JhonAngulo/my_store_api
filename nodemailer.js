const nodemailer = require('nodemailer')

require('dotenv').config()

// async..await is not allowed in global scope, must use a wrapper
async function sendMail () {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true, // true for 465, false for other ports
    port: 465,
    auth: {
      user: process.env.STMP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.STMP_USER, // sender address
    to: process.env.USER_EMAIL, // list of receivers
    subject: 'Este es un nuevo correo', // Subject line
    text: 'Hola test', // plain text body
    html: '<b>Hola test</b>' // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail()
