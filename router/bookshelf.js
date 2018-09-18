const Router = require('koa-router');
const fs = require("fs");

const common = require("../fun/common.js");
let router = new Router();



// 首页
router.get('/', async(ctx) => {
    await ctx.render('bookshelf')
});

// 首页
router.get('/bookList', async(ctx) => {

    var meunName = ctx.query.menuId;
    var dir = './static/data/book/' + meunName + '.json';
    var Booklist = common.fileJson(dir);
    Booklist.code = 1;
    ctx.body = Booklist;
});


module.exports = router;