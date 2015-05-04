# Mongoid2Hashdir
Generate Hashed Directory Structure with Mongoid.
> Example:  55307ca19be8008e14d4a2c4 -> /ef/fe

[![Build Status](https://secure.travis-ci.org/chuyik/mongoid-to-hashdir.png)](http://travis-ci.org/chuyik/mongoid-to-hashdir>)

## Installation
```bash
npm install mongoid2hashdir
```
> Please make sure [Node.js](https://nodejs.org/) is installed.

## Test
```bash
npm run test
```

## Documentation
* [`toArray`](#toArray) - Generate hashed directory structure and return it as array
* [`toFilePath`](#toFilePath) - Generate hashed directory structure and return it as path string
* [`mkdirs`](#mkdirs) - Generate hashed directory structure and create them


<a name="toArray" />
### toArray(mongoid)

__Arguments__

* `mongoid` - `[String, Object]` - Mongoid

__Examples__

```js
mongoid2hashdir.toArray('55307ca19be8008e14d4a2c4')  // ['ef', 'fe']
```



<a name="toFilePath" />
### toFilePath(mongoid)

__Arguments__

* `mongoid` - `[String, Object]` - Mongoid

__Examples__

```js
mongoid2hashdir.toFilePath('55307ca19be8008e14d4a2c4')  // '/ef/fe'
```



<a name="mkdirs" />
### mkdirs(mongoid, basePath, callback)

__Arguments__

* `mongoid` - `[String, Object]` - Mongoid
* `basePath` - `[String]` - Base Path
* `callback(err, fullPath)` - `[Function]` - A callback which is called when directories are created, or an error occurs.

__Examples__

```js
mongoid2hashdir.mkdirs(
  '55307ca19be8008e14d4a2c4',
  '/any/directory',
  function (err, fullPath) {
    console.log('fullPath: ', fullPath)
    // '/any/directory/ef/fe/55307ca19be8008e14d4a2c4' should be created or existed
  }
)
```

