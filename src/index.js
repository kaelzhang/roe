const {
  EggCore,
  EggLoader
} = require('egg-core')

const EGG_LOADER = Symbol.for('egg#loader')
const EGG_PATH = Symbol.for('egg#eggPath')

class AppWorkerLoader extends EggLoader {
  loadConfig () {
    this.loadPlugin()
    super.loadConfig()
  }

  load () {
    // app > plugin > core
    this.loadApplicationExtend()
    this.loadRequestExtend()
    this.loadResponseExtend()
    this.loadContextExtend()
    this.loadHelperExtend()

    // app > plugin
    this.loadCustomApp()
    // app > plugin
    this.loadService()
    // app > plugin > core
    this.loadMiddleware()
    // app
    this.loadController()
    // app
    this.loadRouter() // depend on controller
  }
}

module.exports = class EggApplication extends EggCore {
  constructor (options = {}) {
    options.type = 'application'
    super(options)

    this.loader.loadConfig()
    this.loader.load()
  }

  get [EGG_LOADER] () {
    return AppWorkerLoader
  }

  get [EGG_PATH] () {
    return __dirname
  }
}
