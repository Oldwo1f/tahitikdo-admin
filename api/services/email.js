const nodemailer = require('nodemailer')

module.exports = {

  mainEmail: sails.config.custom.mainEmail,
  mainEmailPassword: sails.config.custom.mainEmailPassword,
  // test: async function (options, template, data, callback) {
  //   console.log('test email')

  //   const transport = nodemailer.createTransport({
  //     host: 'smtp.mailtrap.io',
  //     port: 2525,
  //     auth: {
  //       user: '4d751c99d64101',
  //       pass: '47edc33501e177'
  //     }
  //   })
  //   const templateHTML = await this.fetchTemplate('newUser', {
  //     ipport: 'http://localhost:1337',
  //     company: 'TahitiKDO',
  //     role: 'admin',
  //     link: '/login'
  //   })
  //   const mailOptions = {
  //     from: this.mainEmail,
  //     to: 'alexis.creapassion@gmail.com',
  //     subject: 'Tahiti KDO',
  //     html: templateHTML
  //   }

  //   transport.sendMail(mailOptions, function (error, info) {
  //     if (error) {
  //       console.log(error)
  //     } else {
  //       console.log('Email sent: ' + info.response)
  //     }
  //   })
  // },
  sendEmail: async function (options, template, data, callback) {
    console.log('test email')

    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '4d751c99d64101',
        pass: '47edc33501e177'
      }
    })
    const templateHTML = await this.fetchTemplate(template, {
      ipport: 'http://localhost:1337',
      company: 'TahitiKDO',
      role: data.role ? data.role : 'admin',
      link: data.link ? data.link : '/login',
      password: data.password ? data.password : ''
    })
    const mailOptions = {
      from: this.mainEmail,
      to: options.to ? options.to : 'alexis.creapassion@gmail.com',
      subject: options.subject ? options.subject : 'Tahiti KDO',
      html: templateHTML
    }

    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  },
  fetchTemplate: async function (templatename, data) {
    const template = await sails.renderView('email/' + templatename, { data: data, layout: 'emailLayout' })

    try {
      return template
    } catch (e) {
      console.log('ELSE', e)
    }
  }
}
