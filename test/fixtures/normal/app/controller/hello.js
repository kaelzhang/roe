const {
  Controller
} = require('../../../../..')

module.exports = class HelloController extends Controller {
  say () {
    this.app.bog.error('bog info')
    this.ctx.body = 'hello'
  }
}
