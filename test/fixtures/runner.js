
const test = require('ava')
const path = require('path')
/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest')

const {
  Roe
} = require('../..')

const runner = (cases, baseDir, {
  plugins,
  ...config
} = {}, extra) => {
  let app

  test.before(async () => {
    app = new Roe({
      baseDir: path.join(__dirname, baseDir),
      plugins,
      config
    })

    await app.ready()
  })

  cases.forEach(([method, pathname, code, body]) => {
    test('plugins', t => {
      t.true(!!app.redis.get('a'))
      t.true(!!app.redis.get('b'))
      t.true(!!app.bog)
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
