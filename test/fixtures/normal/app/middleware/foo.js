module.exports = options => async (ctx, next) => {
  await next()
  ctx.set('x-header', 'bar')
}
