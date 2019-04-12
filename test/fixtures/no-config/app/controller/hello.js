const {
  Controller
} = require('../../../../..')

module.exports = class HelloController extends Controller {
  say () {
    this.ctx.body = 'hello'
  }
}
