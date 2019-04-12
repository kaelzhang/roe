[![Build Status](https://travis-ci.org/kaelzhang/roe-core.svg?branch=master)](https://travis-ci.org/kaelzhang/roe-core)
[![Coverage](https://codecov.io/gh/kaelzhang/roe-core/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/roe-core)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/roe-core?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/roe-core)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/roe.svg)](http://badge.fury.io/js/roe)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/roe.svg)](https://www.npmjs.org/package/roe)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/roe-core.svg)](https://david-dm.org/kaelzhang/roe-core)
-->

# roe (-core)

A single and simplified instance of [Egg](https://eggjs.org/) web framework without clusters and agents, which is more suitable for container-based deployment, such as Docker and Kubernetes.

## Install

```sh
$ npm i roe
```

## Usage

The usage of `roe` is much the same as [`egg`](https://eggjs.org), and you can dive into the reference of egg directly.

In addition, `roe` constructor accepts `options.config` as the server configuration, instead of by hardcoding all configurations of different environments in the local project which is an ANTI-PATTERN for ops.

A better practice is to use Kubernetes configmaps and secrets to populate them into `process.env`s.

```js
const {Roe} = require('roe')

const app = new Roe({
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

## new Roe(options)

- **options** `Object`
  - **config** `Object` similar as `config/config.default.js` of egg
  - **extends** `Object` which will be `Object.assign()` into the instance before loaders are invoked.
  - **...others** `Object` other options of [`EggCore`](https://npmjs.org/package/egg-core)

Creates a roe instance.

## License

MIT
