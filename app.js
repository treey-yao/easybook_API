const Koa = require('koa');
const Router = require('koa-router'); //路由
const path = require('path');

const static = require('koa-static'); //静态资源

const app = new Koa();


//静态资源
app.use(static(
    path.join(__dirname, './static')
))



let getMmenu = require('./API/getmenu.js');




//装载所有子路由
let router = new Router()
    //爬去目录
router.use('/getmenu', getMmenu.routes())




//加载路由中间件

app.use(router.routes())
app.use(router.allowedMethods())



app.listen(8082) //设置监听端口