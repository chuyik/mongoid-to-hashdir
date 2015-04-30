var fs   = require('fs')
var path = require('path')

function toArray (id) {
  return _main(id)
}

function toFilePath (id) {
  var arr = toArray(id)
  return '/' + arr[0] + '/' + arr[1]
}

function mkdirs (id, basePath, cb) {
  if (!basePath) throw 'Missing argument: basePath is required.'
  cb = cb || emptyFn

  var arr = toArray(id)

  fs.exists(basePath, function (exists) {
    if (!exists) return cb('basePath is not existed.')

    var p = path.join(basePath, arr[0])

    // first layer
    fs.mkdir(p, function (err) {
      // ignore if exists
      if (err && err.errno !== 47) return cb(err)
        p = path.join(p, arr[1])

        // second layer
        fs.mkdir(p, function (err) {
          // ignore if exists
          if (err && err.errno !== 47) return cb(err)
          cb (null, p)
        })
    })
  })
}

exports.toArray = toArray
exports.toFilePath = toFilePath
exports.mkdirs = mkdirs

function _main (id) {
  if (!id) throw 'Missing argument: mongoid is required.'

  if (typeof id === 'object')
    id = id.toString()

  var hashNum = ''
  for(var i = 0; i < id.length; i++){
    hashNum += id.charCodeAt(i).toString(16)
  }

  // Truncate the number
  hashNum = parseInt(hashNum.substr(hashNum.length - 8))

  var dir1 = ((hashNum) & 0xf).toString(16) + ((hashNum >> 4) & 0xf).toString(16)
  var dir2 = ((hashNum >> 4) & 0xf).toString(16) + ((hashNum) & 0xf).toString(16)

  return [dir1, dir2]
}

function emptyFn () {}