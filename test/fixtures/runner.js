
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

  cases.forEach(([method, pathname, code, body]) => {
    test('extends', t => {
      t.true(!!app.redis.get('a'))
      t.true(!!app.redis.get('b'))
      t.true(!!app.bog)
      t.is(app.a, 1)
    })

    test.cb(`${method} ${pathname}`, t => {
      const r = request(app.callback())[method](pathname)
      .expect(code)

      const rr = code === 404
        ? r
        : r.expect(body)

      rr.end(err => {
        if (err) {
          t.fail(err)
          t.end()
          return
        }

        t.pass()
        t.end()
      })
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
