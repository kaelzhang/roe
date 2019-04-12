const test = require('ava')
/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest')

const {Roe} = require('..')
const {fixture} = require('./fixtures/runner')

let app

test.before(async () => {
  app = new Roe({
    baseDir: fixture('no-config')
  })

  await app.ready()
})

test('no-config: normal request', async t => {
  const {
    text
  } = await request(app.callback())
  .get('/hello')

  t.is(text, 'hello')
})
