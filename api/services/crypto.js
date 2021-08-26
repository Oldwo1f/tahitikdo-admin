
const crypto = require('crypto')
const algorithm = 'sha1'

module.exports = {

  encrypt: function (password) {
	  console.log('Encrypt')
    const hash = crypto
      .createHmac('md5', 'sails.config.secret')
      .update(password)
      .digest('hex')

    return hash
  }

}
