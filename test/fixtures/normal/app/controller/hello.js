const {
  Controller
} = require('../../../../..')

module.exports = class HelloController extends Controller {
  say () {
    if (this.ctx.blah !== 'baz') {
      throw new Error('boooooooooooooooom!')
    }

    this.app.bog.error('bog info')
    this.ctx.body = 'hello'
  }
}
