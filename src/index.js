const {
  EggCore,
  BaseContextClass
} = require('egg-core')

const RoeLoader = require('./loader')
const Singleton = require('./singleton')
const {error} = require('./error')

const EGG_LOADER = Symbol.for('egg#loader')
const EGG_PATH = Symbol.for('egg#eggPath')

const ROE_LOADER = Symbol.for('roe#loader')

class FakeLoader {
}

const NOOP = () => {}
const fakeCoreLogger = {
  debug: NOOP,
  info: NOOP,
  warn: NOOP,
  error: NOOP
}

class Roe extends EggCore {
  constructor (roeOptions) {
    if (Object(roeOptions) !== roeOptions) {
      throw error('INVALID_OPTIONS')
    }

    const {
      config,
      extends: exts,
      ...options
    } = roeOptions

    options.type = 'application'
    super(options)

    if (exts) {
      Object.assign(this, exts)
    }

    const Loader = this[ROE_LOADER]
    if (!Loader) {
      throw error('ROE_LOADER_NOT_FOUND')
    }

    this.loader = new Loader({
      baseDir: options.baseDir,
      app: this,
      plugins: options.plugins,
      logger: this.console,
      serverScope: options.serverScope,
      env: options.env,
      config
    })

    this.loader.loadConfig()
    this.loader.load()
  }

  get coreLogger () {
    return fakeCoreLogger
  }

  get [EGG_LOADER] () {
    return FakeLoader
  }

  get [ROE_LOADER] () {
    return RoeLoader
  }

  get [EGG_PATH] () {
    return __dirname
  }

  addSingleton (name, create) {
    new Singleton({
      name,
      create,
      app: this
    }).init()
  }
}

module.exports = {
  Roe,
  Controller: BaseContextClass,
  Service: BaseContextClass
}
