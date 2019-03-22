
const test = require('ava')
const path = require('path')
/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest')

const {
  Roe
} = require('../..')

const runner = (cases, baseDir, config) => {
  const app = new Roe({
    baseDir: path.join(__dirname, 'app', baseDir),
    config
  })

  test.before(async () => {
    await app.ready()
  })

  cases.forEach(([method, pathname, code, body]) => {
    test(`${method} ${pathname}`, async t => {
      const r = request(app.callback())[method](pathname)
      .expect(code)

      const rr = code === 404
        ? r
        : r.expect(body)

      await rr

      t.pass()
    })
  })
}

module.exports = {
  runner
}
