var path = require('path')

var mkdirp = require('./lib/mkdirp')

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

  var hashPath = toFilePath(id)

  mkdirp(
    basePath,                 // base path: /any/directory
    path.join(hashPath, id),  //  sub path: /ef/fe/55307ca19be8008e14d4a2c4
    cb
  )
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