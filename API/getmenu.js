const Router = require('koa-router');
const book = require("../fun/book.js");
const common = require("../fun/common.js");

var fs = require("fs") //node原生文件系统
var path = require('path'); //node原生路径系统
let router = new Router();

//获取书籍目录
router.get('/menu', async(ctx) => {
    var dir = './static/data/menu/bookMenu.json';
    common.existsFile(dir);
    //判断 分类目录是否有数据
    var menuData = fs.readFileSync(dir, 'utf8');
    if (menuData.length <= 0) {
        var bookMenu = book.bookMenu()
        bookMenu = JSON.parse(bookMenu);
        bookMenu.code = 1;
        ctx.body = bookMenu;
    } else {
        var bookMenu = fs.readFileSync(dir, 'utf8');
        bookMenu = JSON.parse(bookMenu);
        bookMenu.code = 1;
        ctx.body = bookMenu;
    }
});


router.get('/booKs', async(ctx) => {

    //电子书列表
    // book.booklist();

});


module.exports = router;