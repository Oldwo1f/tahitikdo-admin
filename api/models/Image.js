/**
 * Image.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: { type: 'string', required: true, minLength: 5, maxLength: 255 },
    path: { type: 'string' },
    size: { type: 'number' },
    width: { type: 'number' },
    height: { type: 'number' }
  }

}
