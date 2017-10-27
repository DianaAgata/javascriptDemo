new Vue({
    el: "#vue-app",
    data: {
        name: "Florin",
        job: "Ninja",
        website: 'http://www.netninja.co.uk',
        websiteTag: '<a href="http://www.netninja.co.uk">Net Ninja</a>'
    },
    methods: {
        greet: function (time) {
            return 'Good ' + time + ' ' + this.name + ' !';
        }
    }

});