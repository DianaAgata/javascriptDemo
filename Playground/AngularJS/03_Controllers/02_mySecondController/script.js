angular.module('app', []).controller('MainController',
    function ($scope) {

        var person = {
            firstName: "Florin",
            lastName: "Asavei",
            imageSrc: "https://pbs.twimg.com/profile_images/810546874226737152/5sib0JER.jpg"
        };

        $scope.message = "Hello Angular!";
        $scope.anotherMessage = "Hello Again!";
        $scope.person= person;
    });