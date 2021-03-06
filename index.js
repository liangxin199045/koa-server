const Koa = require('koa')      // koa
const Router = require('koa-router')    // 使用router
const bodyParser = require('koa-bodyparser')    // 使用bodyparser
const cors =require('@koa/cors')     // 使用cors
const config =require('./config')   //  服务配置
const app = new Koa()
const router = new Router()

// 使用cors处理options跨域问题
app.use(cors(config.corsOptions || ''))
// 使用router处理api路由
app.use(router.routes())
// 使用bodyparser解析get,post的参数
app.use(bodyParser())

// mock api
const mockControl = require('./src/control/mock.js')
// info api
const InfoControl = require('./src/control/info.js')

router.get('/api/v1/mock', mockControl)
router.get('/api/v1/info', InfoControl)

// log error
app.on('error', (err, ctx) => {
  console.log('server error', err, ctx)
})

// 服务监听端口
app.listen(config.port)
console.log('mock server start success port on:' + config.port)