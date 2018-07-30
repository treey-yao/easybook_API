const Router = require('koa-router');
const book = require("../fun/book.js");



let router = new Router();
router.get('/index', async(ctx) => {
    ctx.body = "呵呵呵";

    //电子书列表
    // book.booklist();
});


module.exports = router;