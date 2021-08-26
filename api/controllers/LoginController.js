/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const crypto = require('crypto')
const dayjs = require('dayjs')
const jwt = require('jwt-simple')
module.exports = {

  addFirstAdmin: async function (req, res, next) {
    const user = {}
    user.username = 'alexissss'
    user.name = 'Momcilovic'
    user.firstname = 'Alexis'
    user.role = 'admin'
    user.password = 'alexis09'
    user.email = 'alexismomscilovic@gmail.com'
    console.log(user)
    const result = await User.create(user).fetch()

    try {
      if (!result) return res.status(401).send({ message: 'Invalid email and/or password' })
    } catch {
      res.send(result)
    }
  },
  login: async function (req, res, next) {
	  console.log('login')
    function createJWT (user) {
      const role = user.role ? user.role : 'user'
      const payload = {
        iss: req.hostname,
        data: { role: role },
        sub: user.id,
        iat: dayjs().valueOf(),
        exp: dayjs().add(14, 'days').valueOf()
      }
      return jwt.encode(payload, 'sails.session.secret')
    }
    try {
      const user = await User.findOne({ username: req.body.username })
      const encrypted = sails.services.crypto.encrypt(req.body.password)
      if (user.password == encrypted) {
        res.send({ token: createJWT(user) })
      } else {
        return res.status(401).send({ message: 'Invalid  password' })
      }
    } catch (err) {
      console.log(err)
      return res.status(401).send({ message: 'Invalid email and/or password' })
    }
  },
  verifyUniqueEmail: function (req, res, next) {
    User.findOne({ email: req.params.email }).exec(function (err, user) {
      if (err) {
        res.status(404).send({ exist: false })
      }
      if (typeof (user) !== 'undefined') {
        res.status(200).send()
      } else {
        res.status(410).send({ exist2: false })
      }
    })
  }

}
