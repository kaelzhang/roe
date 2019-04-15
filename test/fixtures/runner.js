
const test = require('ava')
const path = require('path')
/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest')

const {Roe} = require('../..')

const fixture = (...args) => path.join(__dirname, ...args)

const CASES = [
  ['get', '/hello', 200, 'hello', {
    'x-header': 'bar'
  }],
  ['get', '/hello2', 200, 'hello', {
    'x-header': 'bar'
  }]
]

const GET_CONFIG = t => {
  const logs = []

  const config = {
    plugins: {
      bog: {
        enable: true,
        package: 'egg-bog'
      },

      redis: {
        enable: true,
        package: 'egg-redis'
      },

      snowflake: {
        enable: true,
        package: 'egg-snowflake'
      }
    },

    bog: {
      client: {
        on: {
          error (time, level, log) {
            logs.push(log)
          }
        }
      }
    },

    middleware: [
      'foo'
    ],

    foo: {},

    snowflake: {

    },

    redis: {
      clients: {
        a: {
          host: '127.0.0.1',
          port: 6379,
          password: '',
          db: 0
        },
        b: {
          host: '127.0.0.1',
          port: 6379,
          password: '',
          db: 1
        }
      }
    }
  }

  return {
    extends: {
      a: 1
    },

    extra: logs,

    config: process.env.FUNC_CONFIG
      ? appInfo => {
        t.is(appInfo.name, 'app', 'appInfo.name')
        return config
      }
      : config
  }
}

const AFTER = (t, logs) => {
  t.deepEqual(logs, [
    'bog info'
  ])
}

const runner = (baseDir, cases = CASES, getConfig = GET_CONFIG, after = AFTER) => {
  let app
  let extra

  test.before(async t => {
    const {
      extends: exts,
      config,
      extra: e
    } = getConfig(t)

    extra = e

    app = new Roe({
      baseDir: path.join(__dirname, baseDir),
      extends: exts,
      config
    })

    await app.ready()
  })

  cases.forEach(([method, pathname, code, body, expectHeaders]) => {
    test(`extends: ${method} ${pathname}`, t => {
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
    if (after) {
      after(t, extra)
    }
  })
}

module.exports = {
  runner,
  fixture
}
