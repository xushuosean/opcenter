const Koa = require('koa')
const addController = require('./controller')
const bodyparser = require('koa-bodyparser')

const app = new Koa()

app.use(bodyparser())

const loadController = async() => {
  const routers = await addController()
  return routers
}

loadController().then(res => {
  app.use(res)
  app.listen(4355)
  console.log('Service running on localhost:4355')
})
