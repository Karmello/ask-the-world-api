import nodemailer from 'nodemailer'

import { getMailTemplate } from 'helpers/index'

type TOptions = {
  lang: string
  to: string
  subject: string
  text: string
  btnText: string
  link: string
}

export default (options: TOptions) =>
  new Promise((resolve, reject) => {
    const { EMAIL_USER, EMAIL_PASS } = process.env

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })

    const { lang, to, subject, text, btnText, link } = options

    const mailOptions = {
      from: EMAIL_USER,
      to,
      subject,
      html: getMailTemplate({ lang, text, link, btnText }),
    }

    transporter.sendMail(mailOptions, (err, info) => (err ? reject(err) : resolve(info)))
  })
