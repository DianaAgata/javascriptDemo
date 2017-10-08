new Vue({
    el: "#vue-app",
    data: {
        name: "Florin",
        job: "Ninja"
    },
    methods:{
        greet: function(time){
            return 'Good ' + time + ' ' + this.name + ' !';
        }
    }

});