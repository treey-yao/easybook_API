const Koa = require('koa');
const Router = require('koa-router'); //路由
const path = require('path');

const static = require('koa-static'); //静态资源
const views = require('koa-views'); //模板引擎模


const app = new Koa();


//静态资源
app.use(static(
    path.join(__dirname, './static')
))

// views
app.use(views(path.join(__dirname, './views'), {
    extension: 'html'
}))


// 页面路由
let index = require('./router/index.js');
let login = require('./router/login.js');
let bookshelf = require('./router/bookshelf.js');
let addbook = require('./router/addbook.js');


let getMmenu = require('./API/getmenu.js');



//装载所有子路由
let router = new Router();

router.use('/', index.routes()) //首页
router.use('/login', login.routes()) // 登陆
router.use('/bookshelf', bookshelf.routes()) // 书架
router.use('/addbook', addbook.routes()) // 添加图书
router.use('/getmenu', getMmenu.routes()) //抓取网站数据



//加载路由中间件

app.use(router.routes())
app.use(router.allowedMethods())


app.listen(8082) //设置监听端口