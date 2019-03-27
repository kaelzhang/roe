module.exports = () => async (ctx, next) => {
  ctx.blah = 'baz'
  await next()
  ctx.set('x-header', 'bar')
}
