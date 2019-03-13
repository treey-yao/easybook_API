const Router = require('koa-router');
const book = require("../fun/book.js");
const common = require("../fun/common.js");

var fs = require("fs") //node原生文件系统
var path = require('path'); //node原生路径系统
let router = new Router();

//获取书籍目录
router.get('/menu', async (ctx) => {
    var dir = './static/data/menu/bookMenu.json';
    common.existsFile(dir, function () {
        //判断 分类目录是否有数据
        var menuData = fs.readFileSync(dir, 'utf8');
        if (menuData.length <= 0) {
            book.bookMenu(function (res) {
                var bookMenu = JSON.parse(res);
                bookMenu.code = 1;
                ctx.body = bookMenu;
            });
        } else {
            var bookMenu = common.fileJson(dir)
            bookMenu.code = 1;
            ctx.body = bookMenu;
        }
    });

});

//获取书籍列表
router.get('/bookList', async (ctx) => {
    var menuId = ctx.query.menuId;
    var dir = './static/data/menu/bookMenu.json';
    var dirbook = './static/data/book/' + menuId + '.json';
    var bookMenu = common.fileJson(dir);
    var link, menuText, page = 10;

    for (let i = 0; i < bookMenu.data.length; i++) {
        if (menuId == bookMenu.data[i].menuId) {
            link = bookMenu.data[i].menuLink;
            menuText = bookMenu.data[i].menuNmae;
        }
    }

    common.existsFile(dirbook, function () {
        var bookData = fs.readFileSync(dirbook, 'utf8');
        if (bookData.length <= 0) {
            //书籍列表
            book.booklist(page, menuId, link, menuText, function (listText) {
                var listText = JSON.parse(listText);
                listText.code = 1;
                ctx.body = listText;
            });
        } else {
            var listText = common.fileJson(dirbook)
            listText.code = 1;
            ctx.body = listText;
        }
    });
    console.log(1)
});

module.exports = router;