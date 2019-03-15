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
router.get('/downbook', async (ctx) => {
    var bookInfo = ctx.query;
    var dowm = {};
    var dir = './static/data/works/' + bookInfo.menuId;
    var bookDir = './static/data/book/' + bookInfo.menuId + ".json";
    var bookData = common.fileJson(bookDir);

    common.existsFolder(dir, function () {
        var p = new Promise((resolve, reject) => {
            book.downBook(dir, bookInfo.bookLink, bookInfo.bookId, bookInfo.menuId, function (res) {
                resolve(res);
            })
        });
        p.then(res => {
            if (res) {
                bookData.bookSort.forEach(elm => {
                    if (elm.bookId == bookInfo.bookId) {
                        elm.bookShow = 1;
                    }
                });
                fs.writeFile(bookDir, JSON.stringify(bookData), function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("添加成功！");
                });

                dowm.code = 1;
                ctx.body = dowm;
                console.log("下载成功");
            } else {
                dowm.code = 0;
                ctx.body = dowm;
            }
        })
    })
});

module.exports = router;