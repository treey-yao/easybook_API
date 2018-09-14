var fs = require("fs") //node原生文件系统
var path = require('path'); //node原生路径系统

// 判断是否有该文件
exports.existsFile = function(dir) {
    var stat = fs.existsSync(dir);
    if (!stat) {
        fs.writeFile(dir, "", function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("创建文件成功");
        });
    }
}