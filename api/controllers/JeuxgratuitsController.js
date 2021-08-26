/**
 * JeuxgratuitsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const dayjs = require('dayjs')
const fs = require('fs')
const fspromise = require('fs').promises

module.exports = {

  getHomeFront: async function (req, res) {
    console.log('getHomeFront')
    const datas = await Jeuxgratuits.find({ sort: 'createdAt DESC', where: { status: 'actif', homepage: true } })
    try {
      res.status(200).json(datas)
    } catch (err) {
      res.status(500).json({ error: 'database error' })
    }
  },
  getHomeFront: async function (req, res) {
    console.log('getHomeFront')
    const datas = await Jeuxgratuits.find({ sort: 'createdAt DESC', where: { status: 'actif', homepage: true } })
    try {
      res.status(200).json(datas)
    } catch (err) {
      res.status(500).json({ error: 'database error' })
    }
  },
  getAllFront: async function (req, res) {
    console.log('GET ALL  jeuxgratuis')
    const datas = await Jeuxgratuits.find({ sort: 'createdAt DESC', where: { status: 'actif' } })
    try {
      res.status(200).json(datas)
    } catch (err) {
      res.status(500).json({ error: 'database error' })
    }
  },
  getOneFront: async function (req, res) {
    console.log('GET One  jeuxgratuis')
    const datas = await Jeuxgratuits.findOne(req.params.id)
    try {
      datas.dateTirage = new Date(datas.dateTirage)
      datas.dateCloture = new Date(datas.dateCloture)
      datas.dateLancement = new Date(datas.dateLancement)
      res.status(200).json(datas)
    } catch (err) {
      res.status(404).json({ error: 'database error' })
    }
  },
  getAll: async function (req, res) {
    console.log('GET ALL  jeuxgratuis')
    const datas = await Jeuxgratuits.find({ sort: 'createdAt DESC' })
    try {
      res.status(200).json(datas)
    } catch (err) {
      res.status(500).json({ error: 'database error' })
    }
  },
  getOne: async function (req, res) {
    console.log('GET One  jeuxgratuis')
    const datas = await Jeuxgratuits.findOne(req.params.id)
    try {
      datas.dateTirage = new Date(datas.dateTirage)
      datas.dateCloture = new Date(datas.dateCloture)
      datas.dateLancement = new Date(datas.dateLancement)
      res.status(200).json(datas)
    } catch (err) {
      res.status(404).json({ error: 'database error' })
    }
  },
  add: async function (req, res) {
    console.log('add  jeuxgratuis!')

    const item = {}
    req.body.data = JSON.parse(req.body.data)
    console.log(req.body.data)
    console.log('---------------------------')
    item.name = req.body.data.name
    item.homepage = req.body.data.homepage
    item.status = req.body.data.status
    item.description = req.body.data.description
    item.dateLancement = req.body.data.datelancement ? dayjs(req.body.data.datelancement).valueOf() : dayjs().valueOf()
    item.dateCloture = req.body.data.datecloture ? dayjs(req.body.data.datecloture).valueOf() : dayjs().valueOf()
    item.dateTirage = req.body.data.datetirage ? dayjs(req.body.data.datetirage).valueOf() : dayjs().valueOf()
    console.log(item)

    // if (req.file('file').isNoop) {
    //   console.log('isnoop:', req.file('file').isNoop)
    //   console.log('on a un fichier')
    //   // console.log(req.file('file'))
    //   req.file('file').noMoreFiles()
    // } else {
    console.log('else')

    console.log(req.body)
    req.file('file').upload({
      maxBytes: 10000000
    }, async function whenDone (err, uploadedFiles) {
      console.log('err', err)
      console.log(uploadedFiles)
      if (err) {
        return res.serverError(err)
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0) {
        console.log('No file was uploaded')
      } else {
        try {
          await fspromise.copyFile(uploadedFiles[0].fd, '/var/www/madmin/sailsadmin/public/uploads/' + uploadedFiles[0].filename)
          item.imageUrl = uploadedFiles[0].filename
        } catch (error) {
          console.log('errorcopyfile')
          console.log(error)
          res.status(500).json({ message: error.message })
        }
      }

      try {
        const datas = await Jeuxgratuits.create(item).fetch()
        res.status(200).json(datas)
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
    })
    // }
  },
  update: async function (req, res) {
    console.log('Update jeuxgratuis')

    const item = {}
    req.body.data = JSON.parse(req.body.data)
    console.log('---------------------------')
    item.name = req.body.data.name
    item.description = req.body.data.description
    item.status = req.body.data.status
    item.homepage = req.body.data.homepage
    item.dateLancement = req.body.data.dateLancement ? dayjs(req.body.data.dateLancement).valueOf() : dayjs().valueOf()
    item.dateCloture = req.body.data.dateCloture ? dayjs(req.body.data.dateCloture).valueOf() : dayjs().valueOf()
    item.dateTirage = req.body.data.dateTirage ? dayjs(req.body.data.dateTirage).valueOf() : dayjs().valueOf()
    console.log(item)

    req.file('file').upload({
      maxBytes: 10000000
    }, async function whenDone (err, uploadedFiles) {
      console.log('err', err)
      console.log(uploadedFiles)
      if (err) {
        return res.serverError(err)
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0) {
        console.log('No file was uploaded')
      } else {
        try {
          await fspromise.copyFile(uploadedFiles[0].fd, '/var/www/madmin/sailsadmin/public/uploads/' + uploadedFiles[0].filename)
          item.imageUrl = uploadedFiles[0].filename
        } catch (error) {
          console.log('errorcopyfile')
          console.log(error)
          res.status(500).json({ message: error.message })
        }
      }

      const datas = await Jeuxgratuits.updateOne(req.params.id).set(item)
      try {
        console.log('datas')
        console.log(datas)
        res.status(200).json(datas)
      } catch (err) {
        res.status(404).json({ error: 'database error' })
      }
    })
  },
  delete: async function (req, res) {
    console.log('Delete One  jeuxgratuis')
    const datas = await Jeuxgratuits.destroy(req.params.id)

    try {
      res.status(200).json(datas)
    } catch (err) {
      res.status(404).json({ error: 'database error' })
    }
  }
}
