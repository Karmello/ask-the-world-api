import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'app.ask.the.world@gmail.com',
    pass: 'Jordan#23',
  },
})

type TOptions = {
  to: string
}

export default (options: TOptions, onSuccess: () => void) => {
  //
  const { to } = options

  const mailOptions = {
    from: 'app.ask.the.world@gmail.com',
    to,
    subject: 'Invoices due',
    text: 'Dudes, we really need your money.',
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      onSuccess()
    }
  })
}
