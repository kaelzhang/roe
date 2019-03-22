
const test = require('ava')
const mm = require('egg-mock')
const request = require('supertest')

const CASES = [
  ['get', '/foo', 200, 'foo'],
  ['get', '/bar', 200, 'bar'],
  ['post', '/baz', 200, {
    code: 200,
    body: 'bar'
  }],
  ['put', '/baz2', 200, {
    code: 200,
    body: 'bar'
  }],
  ['get', '/baz3', 200, {
    code: 200,
    body: 'bar'
  }],
]

const NORMAL_CASES = [
  ...CASES,
  ['get', '/not-exists', 404]
]

const EXTENDED_CASES = [
  ['get', '/quux', 200, 'quux'],
  ...CASES,
  // ['get', '/not-exists', 200, 'not 404']
]

const runner = (cases, baseDir) => {
  let app

  test.before(async () => {
    app = mm.app({
      baseDir
    })

    await app.ready()
  })

  test.after(() => app.close())
  test.afterEach(mm.restore)

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
  NORMAL_CASES,
  EXTENDED_CASES,
  runner
}
