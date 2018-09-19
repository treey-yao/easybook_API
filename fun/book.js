const charset = require('superagent-charset');
const superagent = charset(require('superagent')); //一个类似Ajax为了访问网页返回数据的包
require('superagent-proxy')(superagent);

const cheerio = require('cheerio'); //一个类似JQ主要为了读取HTMLE页面的包
const request = require('request'); //一个类似JQ主要为了读取HTMLE页面的包

const fs = require("fs") //node原生文件系统
const path = require('path'); //node原生路径系统
const http = require('https'); //node原生http系统

const common = require("../fun/common.js");

var dir = './static/data/menu/sort01.json';


// 获取书籍分类目录
exports.bookMenu = function(callback) {

    var dir = './static/data/menu/bookMenu.json';
    var Menu = [];
    var Menus = Array();
    superagent.get("https://www.qisuu.la/").end(function(err, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(res.text)
        var $ = cheerio.load(res.text);
        var navText = $(".nav");
        for (let k = 0; k < navText.find("a").length; k++) {
            var arr = '{' +
                '"menuId" : "M' + k + '",' +
                '"menuLink" : "' + navText.find("a").eq(k).attr("href") + '",' +
                '"menuNmae" : "' + navText.find("a").eq(k).text() + '"' +
                '}';
            Menu.push(arr);
        }
        Menus = '{"menuTitleName": "分类菜单", "data": [' + Menu + ']}'
        fs.appendFile(dir, Menus, function(err) {
            if (err) {
                console.log(err);
            }
            console.log("添加成功！");
            callback(Menus);
        });
    });
}


//爬取 电子书列表
//page 爬去多少页
//sortName 分类名称
//sortLink 分类地址
//fileName 文件名
exports.booklist = function(page, fileName, sortLink, sortName, callback) {

    var dir = './static/data/book/' + fileName + '.json';
    var book = [];
    var books = Array();
    console.log("https://www.qisuu.la" + sortLink);

    function indexid(i) {
        if (i == 0) {
            superagent.get("https://www.qisuu.la" + sortLink).set('referer', 'https://www.qisuu.la/').set('host', 'www.qisuu.la').buffer(true).end(function(err, res) {
                var $ = cheerio.load(res.text);
                var texts = $(".listBox");

                // josn 电子书列表 内容
                for (let k = 0; k < texts.find("ul >li").length; k++) {
                    var arr = '{' +
                        '"bookId" : "A' + k + '",' +
                        '"bookNmae" : "' + texts.find("ul >li").eq(k).find("a").eq(0).text() + '",' +
                        '"bookImg" : "' + texts.find("ul >li").eq(k).find("img").attr("src") + '",' +
                        '"bookInfo" : "' + texts.find("ul >li").eq(k).find(".s").text() + '",' +
                        '"bookLink" : "' + texts.find("ul >li").eq(k).find("a").eq(0).attr("href") + '"' +
                        '}'
                    book.push(arr);
                }
                i++;
                indexid(i)
            });
        } else {
            superagent.get("https://www.qisuu.la" + sortLink + "index_" + i + ".html").set('referer', 'https://www.qisuu.la/').set('host', 'www.qisuu.la').buffer(true).end(function(err, res) {
                var $ = cheerio.load(res.text);
                var texts = $(".listBox");

                // josn 电子书列表 内容
                for (let k = 0; k < texts.find("ul >li").length; k++) {
                    var arr = '{' +
                        '"bookId" : "A' + ((i * 14) + parseInt(k)) + '",' +
                        '"bookNmae" : "' + texts.find("ul >li").eq(k).find("a").eq(0).text() + '",' +
                        '"bookImg" : "' + texts.find("ul >li").eq(k).find("img").attr("src") + '",' +
                        '"bookInfo" : "' + texts.find("ul >li").eq(k).find(".s").text() + '",' +
                        '"bookLink" : "' + texts.find("ul >li").eq(k).find("a").eq(0).attr("href") + '"' +
                        '}'
                    book.push(arr);
                }
                i++;
                if (i < page) {
                    indexid(i)
                } else {

                    // josn 电子书列表 
                    books = '{"bookTitleName": "' + sortName + '", "bookSort": [' + book + ']}'
                    fs.appendFile(dir, books, function(err) {
                        if (err) {
                            console.log(err);
                        }
                        console.log("添加成功！");
                        callback(books)
                    });
                }
            });
        }
    }
    indexid(0);

}


//下载 电子书
//dir 下载到的文件夹
//bookLink 下载地址
//bookId  书籍Id

exports.downBook = function(dir, bookLink, bookId, callback) {

    var dirBook = dir;
    console.log("https://www.qisuu.la" + bookLink);
    superagent.get("https://www.qisuu.la" + bookLink).set('referer', 'https://www.qisuu.la/').set('host', 'www.qisuu.la').buffer(true).end(function(err, res) {

        var $ = cheerio.load(res.text);
        var downBtn = $(".showDown");

    })


}