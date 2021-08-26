/**
 * ImageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs')
module.exports = {

  serveImage: function (req, res, next) {
    console.log('serveimage')
    const filePath = 'public/uploads/' + req.params.path
    // +req.params.size+'/'
    // sails.log(filePath);
    const stat = fs.statSync(filePath)
    // setTimeout(function (argument) {
    res.writeHead(200, {
      // 'Content-Type': 'image/',
      'Content-Length': stat.size
    })

    const readStream = fs.createReadStream(filePath)
    readStream.pipe(res)
    // },500)
  }
}
