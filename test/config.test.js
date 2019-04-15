const test = require('ava')
/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest')

const {Roe} = require('../src')
const {fixture} = require('./fixtures/runner')

test('no-config: normal request', async t => {
  const app = new Roe({
    baseDir: fixture('no-config')
  })

  await app.ready()

  const {
    text
  } = await request(app.callback())
  .get('/hello')

  t.is(text, 'hello')
})

test('no-plugin: normal request', async t => {
  const app = new Roe({
    baseDir: fixture('no-config'),
    config: {}
  })

  await app.ready()

  const {
    text
  } = await request(app.callback())
  .get('/hello')

  t.is(text, 'hello')
})
