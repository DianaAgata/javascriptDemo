(function () {
    'use strict';

    angular.module('app')
        .controller('welcome2',[welcome2]);

    function welcome2() {
        var vm = this;

        vm.activate = activate;

        activate();

        function activate() {
            vm.computerOptions = {
                dataSource: {
                    data:
                        [
                            {name: "Macbook Pro", id:1},
                            {name: "Macbook Air", id: 2},
                            {name: "Mac Pro", id: 3},
                            {name: "ASUS ROG", id: 4}
                        ]
                },
                dataTextField: "name",
                dataValueField: "id",
                optionLabel: "Select a computer..."
            }
        }
    }
})();