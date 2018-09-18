$(function() {

    var vm = new Vue({
        el: '#VmBook',
        data: {
            bookMenuBtn: null,
            activeId: 1,
            bookList: null,
            path: "https://www.qisuu.la",
        },
        mounted() {
            this.init();
        },
        methods: {
            init: function() {
                this.MenuBtnAjax();
                this.bookListAjax("M1");

            },
            MenuBtnAjax: function() {
                var that = this;
                axios.get('/getmenu/menu')
                    .then(function(res) {
                        if (res.data.code == 1) {
                            that.bookMenuBtn = res.data.data;
                        } else {
                            showMessage("请先添加目录");
                        }
                    })
                    .catch(function(err) {
                        showMessage("系统错误！请刷新页面");
                        console.log(err);
                    });
            },
            bookListAjax: function(menuId) {
                var that = this;
                axios.get('/bookshelf/bookList', {
                        params: {
                            menuId: menuId,
                        }
                    })
                    .then(function(res) {
                        if (res.data.code == 1) {
                            that.bookList = res.data.bookSort;
                        } else {
                            showMessage("系统错误！请刷新页面");
                        }
                    })
                    .catch(function(err) {
                        showMessage("系统错误！请刷新页面");
                        console.log(err);
                    });
            },
            bookBtn: function(v, i) {
                this.activeId = v;
                this.bookListAjax(i);
            }
        }
    })

});