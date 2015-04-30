# Mongoid2Hashdir
Generate Hashed Directory Structure with Mongoid.
> Example:  55307ca19be8008e14d4a2c4 -> /ef/fe

## Installation
```bash
npm install mongoid2Hashdir
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
mongoid2Hashdir.toArray('55307ca19be8008e14d4a2c4')  // ['ef', 'fe']
```



<a name="toFilePath" />
### toFilePath(mongoid)

__Arguments__

* `mongoid` - `[String, Object]` - Mongoid

__Examples__

```js
mongoid2Hashdir.toFilePath('55307ca19be8008e14d4a2c4')  // '/ef/fe'
```



<a name="mkdirs" />
### mkdirs(mongoid, basePath, callback)

__Arguments__

* `mongoid` - `[String, Object]` - Mongoid
* `basePath` - `[String]` - Base Path
* `callback(err, fullPath)` - `[Function]` - A callback which is called when directories are created, or an error occurs.

__Examples__

```js
mongoid2Hashdir.mkdirs(
    '55307ca19be8008e14d4a2c4',
    '/any/directory',
    function (err, fullPath) {
      console.log('fullPath: ', fullPath)
    })
```

