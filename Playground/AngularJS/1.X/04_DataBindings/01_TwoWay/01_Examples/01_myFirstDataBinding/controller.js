// function HelloController($scope){
//     $scope.greeting={text: 'Hello'}
// }

angular.module('app',[]).controller('HelloController',
    function($scope){
        $scope.greeting = {text: 'Hello'};
    })