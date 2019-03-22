const {error} = require('./error')

module.exports = class Singleton {
  constructor (options) {
    this.clients = new Map()
    this.app = options.app
    this.name = options.name
    this.create = options.create
    /* istanbul ignore next */
    this.options = options.app.config[this.name] || {}
  }

  init () {
    const {options} = this
    if (options.client && options.clients) {
      throw error('INVALID_SINGLETON_CLIENT', this.name)
    }

    // alias app[name] as client, but still support createInstance method
    if (options.client) {
      const client = this.createInstance(options.client)
      this.app[this.name] = client

      client.createInstance = this.createInstance.bind(this)
      return
    }

    // multi clent, use app[name].getInstance(id)
    if (options.clients) {
      Object.keys(options.clients).forEach(id => {
        this.clients.set(id, this.createInstance(options.clients[id]))
      })

      this.app[this.name] = this
      return
    }

    // no config.clients and config.client
    this.app[this.name] = this
  }

  get (id) {
    return this.clients.get(id)
  }

  createInstance (config) {
    // options.default will be merge in to options.clients[id]
    config = Object.assign({}, this.options.default, config)
    return this.create(config, this.app)
  }
}
