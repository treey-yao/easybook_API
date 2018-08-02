const Router = require('koa-router');
var fs = require("fs");

let router = new Router();

router.get('/', async(ctx) => {

    //显示登陆页面
    await ctx.render('login')

});

//登陆验证
router.get('/index', async(ctx) => {
    var userinfo = ctx.query;
    var Userdata = fs.readFileSync('./static/data/user.json'); //同步获取用户数据
    var star = "102" //用户不存在
    Userdata = JSON.parse(Userdata)

    for (let i = 0; i < Userdata.userList.length; i++) {
        console.log("3")
        if (Userdata.userList[i].userName == userinfo.name) {
            if (Userdata.userList[i].userPwd == userinfo.paw) {
                star = 200 //通过
            } else {
                star = 103 //密码不对
            }
        }
    }
    ctx.body = star;
});



module.exports = router;