$(function () {

    var vm = new Vue({
        el: '#VmBook',
        data: {
            name: "",
            type: '玄幻',
            desc: '',
            updel: ''
        },
        methods: {
            init: function () {

            },
        },
        mounted() {
            this.init();
        },
    })

});