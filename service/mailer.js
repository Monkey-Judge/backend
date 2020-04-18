const sgMail = require('@sendgrid/mail')
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const urlConfirmation = 'www.monkeyjudge.com/confirm/'

function sendRegister (to, name, token) {
  const link = urlConfirmation + token
  const msg = {
    from: {
      email: process.env.SENDGRID_SENDER,
      name: 'Monkey Judge'
    },
    to: to,
    subject: `Olá ${name}, seja bem-vindo ao Monkey Judge`,
    text: 'Email de confirmação de registro',
    html: `<strong>clique no link: ${link} </strong>`
  }
  return sgMail.send(msg)
}

module.exports = {
  sendRegister: sendRegister
}
