angular.module('app',[]).controller('MainController',
    function($scope, $http){

        var onUserComplete = function(response){
            $scope.user=response.data;
        };

        $http.get("https://api.github.com/users/javascript-society").then(onUserComplete);


        $scope.message = "Hello Angular!";

    });