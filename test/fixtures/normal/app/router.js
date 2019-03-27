module.exports = ({
  router,
  controller
}) => {
  router.get('/hello', controller.hello.say)
  router.get('/hello2', ctx => {
    if (ctx.blah !== 'baz') {
      throw new Error('boooooooooooooooom!')
    }

    ctx.body = 'hello'
  })
}
