/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const dayjs = require('dayjs')

const jwt = require('jwt-simple')
const { nanoid } = require('nanoid')

module.exports = {
  // testemail: async function (req, res, next) {
  //   console.log('testemail')

  //   email.test()
  //   return res.send('TEST EMAIL')
  // },
  // fetchTemplate: async function (req, res, next) {
  //   console.log('testemail')

  //   email.fetchTemplate()

  //   return res.send('fetchTemplate')
  // },
  login: async function (req, res, next) {
    function createJWT (user) {
      const role = user.role ? user.role : 'user'
      const payload = {
        iss: req.hostname,
        data: { role: role },
        sub: user.id,
        iat: dayjs().valueOf(),
        exp: dayjs().add(14, 'days').valueOf()
      }
      return jwt.encode(payload, sails.config.custom.secret)
    }
    console.log('LOGIN')
    console.log(req.body)
    const users = await User.find({ email: req.body.email })
    try {
      console.log('urser found')
      user = users[0]
      console.log(user)
      const encrypted = sails.services.crypto.encrypt(req.body.password)
      console.log(encrypted)
      console.log(user.password)
      if (user.password == encrypted) {
        res.send({ token: createJWT(user), user: user })
      } else {
        return res.status(401).send({ message: 'Invalid  password' })
      }
    } catch (err) {
      console.log(err)
      return res.status(401).send({ message: 'Email ou mot de passe invalide' })
    }

    // User.find({ email: req.body.data.email }).limit(1).then(function (err, user) {
    //   console.log('urser found')
    //   console.log(user)
    //   if (!user) {
    //     return res.status(401).send({ message: 'Invalid email and/or password' })
    //   }
    //   const encrypted = crypto.encrypt(req.body.password)
    //   if (user.password == encrypted) {
    //     res.send({ token: createJWT(user) })
    //   } else {
    //     return res.status(401).send({ message: 'Invalid  password' })
    //   }
    // })
  },

  me: async function (req, res) {
    console.log('GET ME')

    console.log(req.user)
    const datas = await User.findOne(req.user)
    try {
      console.log(datas)
      res.status(200).json(datas)
    } catch (err) {
      res.status(404).json({ error: 'database error' })
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
  },
  passwordrecovery: async function (req, res, next) {
    console.log(req.body)
    req.body.data = JSON.parse(req.body.data)

    console.log('req.body.data.email', req.body.data.email)
    const user = await User.findOne({ email: req.body.data.email })

    if (user) {
      email.sendEmail({
        subject: 'Récupération de mot de passe - Tahiti KDO',
        to: user.email
      }, 'passwordrecovery', {
        role: 'user',
        link: '/api/passwordrecovery/' + user.email + '/' + user.newpasswordhash

      }, function (rep) {
        console.log('rep after email')
        if (user.role == 'admin') {
          res.setHeader('Content-Type', 'text/html')
          return res.status(301).redirect('http://localhost:3000/login')
        } else {
          res.setHeader('Content-Type', 'text/html')
          return res.status(301).redirect('http://localhost:8000/login')
        }
      })
    } else {
      console.log('no correct email')
      res.status(404).send({ exist: false })
    }
  },
  passwordSendNew: async function (req, res, next) {
    console.log('send new password')
    User.findOne({ email: req.params.email }).exec(async function (err, user) {
      if (err) {
        res.status(404).send({ exist: false })
      }
      if (typeof (user) !== 'undefined') {
        console.log(req.params.hash)
        console.log('===>')
        console.log(user.newpasswordhash)

        if (req.params.hash === user.newpasswordhash) {
          const newpassword = nanoid(10)
          const datas = await User.updateOne(user.id).set({ password: newpassword })
          let link
          try {
            if (user.role == 'admin') {
              link = 'http://localhost:3000/login'
            } else {
              link = 'http://localhost:8000/login'
            }
            email.sendEmail({
              subject: 'Votre mot de passe est arrivé - Tahiti KDO',
              to: user.email
            }, 'passwordnew', {
              link: link,
              password: newpassword

            }, function (rep) {
              console.log('rep after email')
              if (user.role == 'admin') {
                res.setHeader('Content-Type', 'text/html')
                return res.status(301).redirect('http://localhost:3000/login')
              } else {
                res.setHeader('Content-Type', 'text/html')
                return res.status(301).redirect('http://localhost:8000/login')
              }
            })

            res.setHeader('Content-Type', 'text/html')
            res.status(200).send('<p>Vous trouverez votre nouveau mot de passe dans votre boite mail<p>')
          } catch (err) {
            res.status(404).json({ error: 'database error' })
          }
        } else {
          res.status(200).json({ message: 'Votre password n\'a pus être changer' })
        }
      } else {
        res.status(410).send({ exist2: false })
      }
    })
  },
  comfirmEmail: async function (req, res, next) {
    User.findOne({ email: req.params.email }).exec(async function (err, user) {
      if (err) {
        res.status(404).send({ exist: false })
      }
      if (typeof (user) !== 'undefined') {
        console.log(req.params.hash)
        console.log('===>')
        console.log(user.newemailhash)

        if (req.params.hash === user.newemailhash) {
          const datas = await User.updateOne(user.id).set({ emailconfirmed: true })
          try {
            if (datas.role == 'admin') {
              res.setHeader('Content-Type', 'text/html')
              return res.status(301).redirect('http://localhost:3000/login')
            } else {
              res.setHeader('Content-Type', 'text/html')
              return res.status(301).redirect('http://localhost:8000/login')
            }

            // res.status(200).json()
          } catch (err) {
            res.status(404).json({ error: 'database error' })
          }
        } else {
          res.status(200).json({ message: 'Votre email n\'a pus être comfirmé' })
        }
      } else {
        res.status(410).send({ exist2: false })
      }
    })
  },
  getOne: async function (req, res) {
    console.log('GET One USER')
    const datas = await User.findOne(req.params.id)
    try {
      res.status(200).json(datas)
    } catch (err) {
      res.status(404).json({ error: 'database error' })
    }
  },
  add: async function (req, res) {
    console.log('add user!')
    console.log(req.body)
    req.body.data = JSON.parse(req.body.data)
    req.body.data.role = 'user'
    req.body.data.newemailhash = nanoid()
    req.body.data.newpasswordhash = nanoid()
    const datas = await User.create(req.body.data).fetch()

    try {
      console.log(datas)
      console.log('Sucess')

      email.sendEmail({
        subject: 'Comfirmation email - Tahiti KDO',
        to: datas.email
      }, 'newUser', {
        role: 'user',
        link: '/api/comfirmEmail/' + datas.email + '/' + datas.newemailhash

      }, function (rep) {
        console.log('rep after email')
        console.log(rep)
      })

      res.status(200).json(datas)
    } catch (err) {
      console.log('HEYHO err')
      console.log(err)
      res.status(500).json({ error: 'database error' })
    }
  },
  signin: async function (req, res) {
    console.log('signin!')
    console.log(req.body)
    req.body.data = JSON.parse(req.body.data)
    req.body.data.role = 'user'
    req.body.data.newemailhash = nanoid()
    req.body.data.newpasswordhash = nanoid()
    const datas = await User.create(req.body.data).fetch()

    try {
      console.log(datas)
      console.log('Sucess')
      email.sendEmail({
        subject: 'Création administrateur - Tahiti KDO',
        to: datas.email
      }, 'newUser', {
        role: 'user',
        link: '/api/comfirmEmail/' + datas.email + '/' + datas.newemailhash

      }, function (rep) {
        console.log('rep after email')
        console.log(rep)
      })
      res.status(200).json(datas)
    } catch (err) {
      console.log('HEYHO err')
      res.status(500).json({ error: 'database error' })
    }
  },
  addAdmin: async function (req, res) {
    console.log('add admin!')
    console.log(req.body)
    req.body.data = JSON.parse(req.body.data)
    req.body.data.role = 'admin'
    req.body.data.newemailhash = nanoid()
    req.body.data.newpasswordhash = nanoid()
    const datas = await User.create(req.body.data).fetch()

    try {
      console.log(datas)
      console.log('Sucess')
      email.sendEmail({
        subject: 'Création administrateur - Tahiti KDO',
        to: datas.email

      }, 'newUser', {
        role: 'admin',
        link: '/api/comfirmEmail/' + datas.email + '/' + datas.newemailhash

      }, function (rep) {
        console.log('rep after email')
        console.log(rep)
      })
      res.status(200).json(datas)
    } catch (err) {
      console.log('HEYHO err')
      res.status(500).json({ error: 'database error' })
    }
  },

  getAllAdmin: async function (req, res) {
    console.log('GET ALL  admin')
    const datas = await User.find({ where: { role: 'admin' }, sort: 'createdAt DESC' })
    try {
      res.status(200).json(datas)
    } catch (err) {
      res.status(500).json({ error: 'database error' })
    }
  },
  getAll: async function (req, res) {
    console.log('GET ALL  user')
    const datas = await User.find({ where: { role: 'user' }, sort: 'createdAt DESC' })
    try {
      res.status(200).json(datas)
    } catch (err) {
      res.status(500).json({ error: 'database error' })
    }
  },
  update: async function (req, res) {
    console.log('Update admin ')
    const item = {}
    req.body.data = JSON.parse(req.body.data)
    console.log('---------------------------')
    item.username = req.body.data.username
    item.lastname = req.body.data.lastname
    item.firstname = req.body.data.firstname
    item.email = req.body.data.email
    console.log(item)

    const datas = await User.updateOne(req.params.id).set(item)
    try {
      res.status(200).json(datas)
    } catch (err) {
      res.status(404).json({ error: 'database error' })
    }
  },

  delete: async function (req, res) {
    console.log('delete One User')
    console.log(req.params.id)
    const datas = await User.destroy(req.params.id)
    try {
      res.status(200).json(datas)
    } catch (err) {
      res.status(404).json({ error: 'database error' })
    }
  }

}
