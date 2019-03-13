$(function () {
    var vm = new Vue({
        el: '#VmBook',
        data: {
            newData: "",
        },
        methods: {
            init: function () {

            },
            ajaxNewBook: function (menuId) {
                var that = this;
                axios.get('/bookshelf/bookList', {
                    params: {
                        menuId: menuId,
                    }
                }).then(function (res) {
                    console.log(res)
                    if (res.data.code == 1) {
                        that.bookList = res.data.bookSort;
                    } else {
                        showMessage("系统错误！请刷新页面");
                    }
                })
                    .catch(function (err) {
                        showMessage("系统错误！请刷新页面");
                        console.log(err);
                    });
            },
        },
        mounted() {
            this.init();
        },
    })

});