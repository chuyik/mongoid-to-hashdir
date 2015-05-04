var fs   = require('fs')
var path = require('path')

module.exports = function (basePath, subPath, cb) {

  fs.exists(basePath, function (exists) {
    if (!exists) return cb('basePath is not existed.')

    var dirs = subPath.split('/').filter(function (e) {return e})

    var done = false;

    var tasks = dirs.map(function (dir, i) {
      return function (cb) {
        var curPath = path.join(basePath, dirs.slice(0, i + 1).join('/'))
        fs.mkdir(curPath, function(err) {
          // ignore if exists
          if (err && err.code !== 'EEXIST') return cb(err)
          cb(null, curPath)
        })
      }
    })

    aSyncSeries(tasks, cb)
  })
}


function aSyncSeries (tasks, cb) {
  var count = -1
  function next(err, done) {
    if (err) return cb(err)

    if (++count < tasks.length) {
      return tasks[count](next)
    }

    cb(err, done)
  }

  next()
}

