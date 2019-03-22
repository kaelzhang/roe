const {
  EggCore,
  BaseContextClass
} = require('egg-core')

const RoeLoader = require('./loader')

const EGG_LOADER = Symbol.for('egg#loader')
const EGG_PATH = Symbol.for('egg#eggPath')

const ROE_LOADER = Symbol.for('roe#loader')

class FakeLoader {
}

class Roe extends EggCore {
  constructor ({
    config,
    ...options
  } = {}) {
    options.type = 'application'
    super(options)

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
