/**
 * Jeuxgratuits.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string', required: true },
    url: { type: 'string' },
    homepage: { type: 'boolean', defaultsTo: false },
    imageUrl: { type: 'string' },
    status: { type: 'string', isIn: ['draft', 'actif', 'inactif'], defaultsTo: 'draft' }
  },
  beforeCreate: function (value, callback) {
    return callback()
  },
  datastore: 'mymongo',
  migrate: 'alter'

}
