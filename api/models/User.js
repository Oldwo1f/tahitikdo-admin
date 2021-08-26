/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    lastname: { type: 'string' },
    firstname: { type: 'string' },
    email: { type: 'string', unique: true, isEmail: true },
    password: { type: 'string', required: true },
    newemailhash: { type: 'string' },
    newpasswordhash: { type: 'string' },
    emailconfirmed: { type: 'boolean', defaultsTo: false },
    image: { type: 'string' },
    role: { type: 'string', isIn: ['user', 'admin', 'restaurant'], defaultsTo: 'user' },
    inscriptions: {
      collection: 'jeuxgratuits',
      via: 'inscrits'
    }
  },
  beforeCreate: function (value, callback) {
    const encrypted = sails.services.crypto.encrypt(value.password)
    value.password = encrypted

    // mail.sendEmail({
    //   from: '"' + sails.config.company + '" <' + sails.config.mainEmail + '>', // sender address
    //   to: value.email, // list of receivers
    //   subject: sails.config.company + ' - Creation de compte' // Subject line
    // }, 'newUser', { link: link, company: company, role: role, URL_HOME: sails.config.URL_HOME, ipport: 'http://92.243.9.205:' + sails.config.port + '/' }).then(function (data) {
    // })
    return callback()
  },
  beforeUpdate: function (value, callback) {
    const encrypted = sails.services.crypto.encrypt(value.password)
    value.password = encrypted

    // mail.sendEmail({
    //   from: '"' + sails.config.company + '" <' + sails.config.mainEmail + '>', // sender address
    //   to: value.email, // list of receivers
    //   subject: sails.config.company + ' - Creation de compte' // Subject line
    // }, 'newUser', { link: link, company: company, role: role, URL_HOME: sails.config.URL_HOME, ipport: 'http://92.243.9.205:' + sails.config.port + '/' }).then(function (data) {
    // })
    return callback()
  },
  datastore: 'mymongo',
  migrate: 'alter'
}
