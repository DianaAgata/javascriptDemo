'use strict';

eventsApp.controller('EventController',
    function EventController($scope){
        $scope.event = {
            name: 'My Party',
            date: '05/11/2017',
            time: '5:30 pm'
        };

    }
);