const {
  EggLoader
} = require('egg-core')
const extend = require('extend2')

module.exports = class AppWorkerLoader extends EggLoader {
  constructor (options) {
    super(options)
    this._customConfig = options.config
  }

  loadConfig () {
    this.loadPlugin()
    super.loadConfig()

    if (!this._customConfig) {
      return
    }

    extend(true, this.config, this._customConfig)

    const {middleware} = this._customConfig
    if (Array.isArray(middleware)) {
      this.config.appMiddleware.push(...middleware)
    }
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
