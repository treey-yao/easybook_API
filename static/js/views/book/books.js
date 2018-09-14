$(function() {

    var vm = new Vue({
        el: '#VmBook',
        data: {
            bookMenuBtn: null,
        },
        mounted() {
            this.init();
        },
        methods: {
            init: function() {
                var that = this;
                axios.get('/getmenu/menu')
                    .then(function(res) {
                        console.log(res);
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
            addBook: function(id) {
                var that = this;


            }


        }
    })

});