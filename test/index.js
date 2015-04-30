var fs   = require('fs')
var path = require('path')

var mongoid2Hashdir = require('..')
var mongoids = require('./data')

testToHashArray()
testToHashUrl()
testMkdirs()

function testToHashArray () {
  var results = mongoids.map(mongoid2Hashdir.toArray)

  var pDirs = {}, sDirs = {}

  results.forEach(function (dirs) {
    pDirs[dirs[0]] = ++pDirs[dirs[0]] || 1
    sDirs[dirs[1]] = ++sDirs[dirs[1]] || 1
  })

  var str1, str2 = 'folder| count \n--------------\n';
  str1 = str2

  Object.keys(pDirs).forEach(function(k) {
    str1 += '  ' + k + '  |  ' + pDirs[k] + '\n'
  })
  Object.keys(sDirs).forEach(function(k) {
    str2 += '  ' + k + '  |  ' + sDirs[k] + '\n'
  })

  fs.writeFile(path.join(__dirname, 'parent_dir_stats.txt'), str1, done)
  fs.writeFile(path.join(__dirname, 'sub_dir_stats.txt'), str2, done)
}

function testToHashUrl () {
  var results = mongoids.map(mongoid2Hashdir.toFilePath)

  var paths = {}

  results.forEach(function(path) {
    paths[path] = ++paths[path] || 1
  })

  var str = ''

  Object.keys(paths).forEach(function(k) {
    str += '  ' + k + '  |  ' + paths[k] + '\n'
  })

  fs.writeFile(path.join(__dirname, 'paths_stats.txt'), str, done)
}

function testMkdirs () {
  mongoid2Hashdir.mkdirs(mongoids[0], __dirname, function (err, path) {
    if (err) return done(err)

    var exists = fs.existsSync(path)

    if (exists)
      done()
    else
      done('`mkdirs` failed to create path.')
  })
}

var doneCount = 0
function done (err) {
  if (err) throw err;
  if (++doneCount === 4)
    console.log('Test completed, check ./test/*.txt for results.')
}

