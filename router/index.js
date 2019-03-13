const Router = require('koa-router');
var fs = require("fs");

let router = new Router();

// 首页
router.get('/', async (ctx) => {
    await ctx.render('index')

});


module.exports = router;