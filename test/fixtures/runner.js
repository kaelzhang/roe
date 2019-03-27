
const test = require('ava')
const path = require('path')
/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest')

const {
  Roe
} = require('../..')

const runner = (cases, baseDir, {
  plugins,
  extends: exts,
  ...config
} = {}, extra) => {
  let app

  test.before(async () => {
    app = new Roe({
      baseDir: path.join(__dirname, baseDir),
      plugins,
      extends: exts,
      config
    })

    await app.ready()
  })

  cases.forEach(([method, pathname, code, body, expectHeaders]) => {
    test('extends', t => {
      t.true(!!app.redis.get('a'))
      t.true(!!app.redis.get('b'))
      t.true(!!app.bog)
      t.is(app.a, 1)
    })

    test(`${method} ${pathname}`, async t => {
      const r = request(app.callback())[method](pathname)
      .expect(code)

      const rr = code === 404
        ? r
        : r.expect(body)

      const {
        headers
      } = await rr

      if (expectHeaders) {
        Object.keys(expectHeaders).forEach(key => {
          t.is(headers[key], expectHeaders[key])
        })
      }

      t.pass()
    })
  })

  test.after(t => {
    if (extra) {
      extra(t)
    }
  })
}

module.exports = {
  runner
}
