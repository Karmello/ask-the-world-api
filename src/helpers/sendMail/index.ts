import nodemailer from 'nodemailer'

type TOptions = {
  to: string
  subject: string
  link: string
}

export default (options: TOptions) =>
  new Promise((resolve, reject) => {
    //
    const { EMAIL_USER, EMAIL_PASS } = process.env

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 25,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })

    const { to, subject, link } = options

    const mailOptions = {
      from: EMAIL_USER,
      to,
      subject,
      html: `<p><a href="${link}" target="new">${link}</a></p>`,
    }

    transporter.sendMail(mailOptions, (err, info) => (err ? reject(err) : resolve(info)))
  })
