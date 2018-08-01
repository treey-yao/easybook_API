const Router = require('koa-router');

let router = new Router();

router.get('/', async(ctx) => {

    //显示登陆页面
    await ctx.render('login')

});



module.exports = router;