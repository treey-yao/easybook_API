const Router = require('koa-router');
const fs = require("fs");

const common = require("../fun/common.js");
const book = require("../fun/book.js");

let router = new Router();



// 首页
router.get('/', async (ctx) => {
    await ctx.render('bookshelf')
});

// 首页
router.get('/bookList', async (ctx) => {

    var meunName = ctx.query.menuId;
    var dir = './static/data/book/' + meunName + '.json';
    var Booklist = common.fileJson(dir);
    Booklist.code = 1;
    ctx.body = Booklist;
});

// 下载图书
router.get('/downBook', async (ctx) => {
    var bookInfo = ctx.query;
    var dir = './static/data/works/' + bookInfo.menuId;
    common.existsFolder(dir, function () {
        book.downBook(dir, bookInfo.bookLink, bookInfo.bookId, bookInfo.menuId, function () {
            ctx.body = "11111";
        })
    });
});

module.exports = router;