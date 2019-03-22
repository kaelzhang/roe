[![Build Status](https://travis-ci.org/kaelzhang/roe.svg?branch=master)](https://travis-ci.org/kaelzhang/roe)
[![Coverage](https://codecov.io/gh/kaelzhang/roe/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/roe)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/roe?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/roe)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/roe.svg)](http://badge.fury.io/js/roe)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/roe.svg)](https://www.npmjs.org/package/roe)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/roe.svg)](https://david-dm.org/kaelzhang/roe)
-->

# roe

A single egg instance.

Egg web framework without clusters and agents, which is more suitable for container-based deployment, such as Docker and Kubernetes.

## Install

```sh
$ npm i roe
```

## Usage

```js
const Application = require('roe')

const app = new Application({
  baseDir: '/path/to',

  // We can define roe configurations directly
  //   by passing options.config, which is a good practise
  //   for k8s based environment variables management
  config: {
    keys: process.env.SECRET_KEY,
    middleware: [
      'body-parser'
    ]
  }
})

app.ready(() => {
  app.listen(8888)
})
```

Or starting with vanilla nodejs http server

```js
require('http')
.createServer(app.callback())
.listen(8888)
```

## License

MIT
