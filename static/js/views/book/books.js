$(function() {

    var vm = new Vue({
        el: '#VmBook',
        data: {
            bookMenuBtn: null,
            menuName: "分类名称",
            BooKtext: "分类数据"
        },
        mounted() {
            this.init();
        },
        methods: {
            init: function() {
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
            addBook: function(menuId) {
                var that = this;
                axios.get('/getmenu/bookList', {
                        params: {
                            menuId: menuId,
                        }
                    })
                    .then(function(res) {
                        if (res.data.code == 1) {
                            that.menuName = res.data.bookTitleName;
                            that.BooKtext = res.data.bookSort;
                        } else {
                            showMessage("系统错误！请刷新页面");
                        }
                    })
                    .catch(function(err) {
                        showMessage("系统错误！请刷新页面");
                        console.log(err);
                    });
            }
        }
    })

});