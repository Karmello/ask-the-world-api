import nodemailer from 'nodemailer'

import dict from 'src/dictionary'

type TOptions = {
  to: string
  activationLink: string
}

export default (options: TOptions) =>
  new Promise((resolve, reject) => {
    //
    const { EMAIL_USER, EMAIL_PASS } = process.env

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })

    const { to, activationLink } = options

    const mailOptions = {
      from: EMAIL_USER,
      to,
      subject: dict.mailSubject,
      html: `<p><a href="${activationLink}" target="new">${activationLink}</a></p>`,
    }

    transporter.sendMail(mailOptions, (err, info) => (err ? reject() : resolve()))
  })
