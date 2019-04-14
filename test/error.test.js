const path = require('path')
const test = require('ava')
const {format} = require('util')

const {
  ROE_LOADER_NOT_FOUND,
  INVALID_OPTIONS,
  INVALID_SINGLETON_CLIENT,
  INVALID_OPTION_CONFIG
} = require('../src/error')

const {
  Roe
} = require('../src')

const ROE_LOADER = Symbol.for('roe#loader')

class Application extends Roe {
  get [ROE_LOADER] () {
    return null
  }
}

const DIR_NORMAL = path.join(__dirname, 'fixtures', 'normal')

test('roe-loader not found', t => {
  t.throws(() => new Application({
    baseDir: DIR_NORMAL
  }), ROE_LOADER_NOT_FOUND)
})

test('constructor options', t => {
  t.throws(() => new Roe(), INVALID_OPTIONS)
})

test('invalid plugin client', t => {
  t.throws(() => new Roe({
    baseDir: DIR_NORMAL,
    plugins: {
      bog: {
        enable: true,
        package: 'egg-bog'
      }
    },
    config: {
      bog: {
        client: {},
        clients: {}
      }
    }
  }), format(INVALID_SINGLETON_CLIENT, 'bog'))
})

test('invalid options.config', t => {
  t.throws(() => new Roe({
    baseDir: DIR_NORMAL,
    plugins: {
      bog: {
        enable: true,
        package: 'egg-bog'
      }
    },
    config: 'foo'
  }), format(INVALID_OPTION_CONFIG, 'foo'))
})
