const {
  Controller
} = require('../../../../..')

module.exports = class HelloController extends Controller {
  say () {
    this.app.bog.error('bog info')

    // this.app.log.get('a').info('log a info')
    // this.app.log.get('b').info('log b info')
    this.ctx.body = 'hello'
  }
}
