//this sintax no longer works
// var MainController = function($scope) {
//
//     $scope.message="Hello Angular!";
//
// };


angular.module('app',[]).controller('MainController',
    function($scope){
        $scope.message = "Hello Angular!";
    });