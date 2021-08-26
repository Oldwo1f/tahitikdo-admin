/**
 * Jeuxgratuits.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string', required: true, minLength: 5, maxLength: 255 },
    description: { type: 'string' },
    dateLancement: { type: 'number' },
    dateCloture: { type: 'number' },
    dateTirage: { type: 'number' },
    imageUrl: { type: 'string' },
    homepage: { type: 'boolean', defaultsTo: false },
    status: { type: 'string', isIn: ['draft', 'actif', 'inactif'], defaultsTo: 'draft' },
    // role: { type: 'string', isIn: ['user', 'admin', 'restaurant'], defaultsTo: 'user' }
    inscrits: {
      collection: 'user',
      via: 'inscriptions'
    }
  },
  beforeCreate: function (value, callback) {
    // const encrypted = sails.services.crypto.encrypt(value.password)
    // value.password = encrypted

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
