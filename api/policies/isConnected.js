const jwt = require('jwt-simple')

module.exports = function (req, res, next) {
  console.log('isConnected')
  console.log(req.headers.authorization)
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' })
  }
  console.log('ici')
  const token = req.headers.authorization.split(' ')[1]
  console.log(token)
  const payload = jwt.decode(token, sails.config.custom.secret)
  console.log('la')
  if (payload.exp <= Date.now()) {
    return res.status(401).send({ message: 'Token has expired' })
  }
  console.log('on est la')
  console.log(payload.data)
  console.log(payload.sub)
  if (typeof (payload.data) !== 'undefined') {
    req.user = payload.sub
    next()
  } else {
    res.status(403).send('Vous n\'avez pas les droits')
  }
}
