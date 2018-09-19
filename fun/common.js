var fs = require("fs") //node原生文件系统
var path = require('path'); //node原生路径系统

// 判断是否有该文件
exports.existsFile = function(dir, callback) {
    var stat = fs.existsSync(dir);
    if (!stat) {
        fs.writeFile(dir, "", function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("创建文件成功");
            callback();
        });
    } else {

    }
};

// 判断是否有该文件夹
exports.existsFolder = function(dir, callback) {
    var stat = fs.existsSync(dir);
    if (stat) {
        callback();
    } else {
        fs.mkdir(dir, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("创建文件成功");
            callback();
        })
    }
};


// 获取文件数据 并转换成Json
exports.fileJson = function(dir) {
    var bookText = fs.readFileSync(dir, 'utf8');
    bookText = JSON.parse(bookText);
    return bookText;
};