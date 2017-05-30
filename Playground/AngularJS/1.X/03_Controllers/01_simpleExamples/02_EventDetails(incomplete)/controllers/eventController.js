'use strict';

eventsApp.controller('EventController', ["$scope",
    function EventController($scope) {
        $scope.event = {
            "name": "Awesome Event",
            "date": "24/05/2017",
            "time": "10pm"
        };
    }]
);