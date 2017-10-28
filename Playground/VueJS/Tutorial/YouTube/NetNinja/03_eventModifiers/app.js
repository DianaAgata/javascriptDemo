new Vue({
    el: "#vue-app",
    data: {
        age: 26,
        x:0,
        y:0
    },
    methods: {
        add: function (inc) {
            this.age += inc;
        },
        subtract: function (dec) {
            this.age -= dec;
        },
        updateXY: function(){
            console.log(event);
            this.x = event.offsetX;
            this.y = event.offsetY;
        },
        click: function(){
            alert('You clicked me!');
        }
    }

});