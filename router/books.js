const Router = require('koa-router');
var fs = require("fs");

const book = require("../fun/book.js");
let router = new Router();

// 首页
router.get('/', async(ctx) => {
    await ctx.render('books/books');
});




// 获取书籍列表
router.get('/clawBook', async(ctx) => {
    var menuInfo = ctx.query;
    var page = 10;

    var dir = './static/data/book/' + menuInfo.mid + '.json';
    //判断是否有这个文件
    var stat = fs.existsSync(dir);
    if (stat) {
        var bookData = fs.readFileSync(dir, 'utf8');
        bookData = JSON.parse(bookData);
        bookData.code = 1;
        ctx.body = bookData;

    } else {

        // var booklist = book.booklist(page, )
        ctx.body = menuData;
    }

});





module.exports = router;