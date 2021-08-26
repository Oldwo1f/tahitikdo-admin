const crypto = require('crypto')

module.exports = {

  fn: function (password) {
    const hash = crypto
      .createHmac('sha1', 'sails.config.secret')
      .update(password)
      .digest('hex')

    return hash
  }

}
