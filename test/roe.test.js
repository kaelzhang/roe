const {
  runner
} = require('./fixtures/runner')

const CASES = [
  ['get', '/hello', 200, 'hello', {
    'x-header': 'bar'
  }]
]

const logs = []

runner(CASES, 'normal', {
  extends: {
    a: 1
  },
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
}, t => {
  t.deepEqual(logs, [
    'bog info'
  ])
})
