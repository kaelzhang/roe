module.exports = ({
  router,
  controller
}) => {
  router.get('/hello', controller.hello.say)
}
