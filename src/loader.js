const {EggLoader} = require('egg-core')
const extend = require('extend2')
const {isFunction} = require('core-util-is')

const ITEMS_TO_LOAD = [
  // app > plugin > core
  'loadApplicationExtend',
  'loadRequestExtend',
  'loadResponseExtend',
  'loadContextExtend',
  'loadHelperExtend',

  // app > plugin
  'loadCustomApp',

  // app > plugin
  'loadService',

  // app > plugin > core
  'loadMiddleware',

  // app
  'loadController',

  // app
  'loadRouter'
]

module.exports = class AppWorkerLoader extends EggLoader {
  constructor (options) {
    super(options)

    this._customConfig = isFunction(options.config)
      ? options.config.call(null, this.getAppInfo())
      : options.config

    if (!this._customConfig) {
      return
    }

    const {plugins} = this._customConfig
    if (plugins) {
      this.options.plugins = plugins
    }
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
    const {config} = this

    for (const type of ITEMS_TO_LOAD) {
      if (config[type] !== false) {
        this[type]()
      }
    }
  }
}
