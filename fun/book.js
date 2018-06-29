var charset = require('superagent-charset');
var superagent = charset(require('superagent')); //一个类似Ajax为了访问网页返回数据的包

var cheerio = require('cheerio'); //一个类似JQ主要为了读取HTMLE页面的包
var request = require('request'); //一个类似JQ主要为了读取HTMLE页面的包

var fs = require("fs") //node原生文件系统
var path = require('path'); //node原生路径系统
var http = require("http"); //node原生http系统

var dir = './static/data/menu/sort01.json';



// 爬取 电子书列表
exports.booklist = function() {

    superagent.get("https://www.qisuu.la/soft/sort01/").end(function(err, res) {
        var $ = cheerio.load(res.text);
        var texts = $(".listBox");

        var book = [];
        var books = Array();

        // josn 电子书列表 内容
        for (let i = 0; i < texts.find("ul >li").length; i++) {
            var arr = '{' +
                '"bookId" : "A' + i + '",' +
                '"bookNmae" : "' + texts.find("ul >li").eq(i).find("a").eq(0).text() + '",' +
                '"bookImg" : "' + texts.find("ul >li").eq(i).find("img").attr("src") + '",' +
                '"bookInfo" : "' + texts.find("ul >li").eq(i).find(".s").text() + '",' +
                '"bookLink" : "' + texts.find("ul >li").eq(i).find("a").eq(0).attr("href") + '"' +
                '}'
            book.push(arr);
        }
        // josn 电子书列表 
        books = '{"bookSort": [' + book + ']}'
        fs.appendFile(dir, books, function(err) {
            if (err) {
                console.log(err);
            }
            console.log("添加成功！");
        });
    })
}