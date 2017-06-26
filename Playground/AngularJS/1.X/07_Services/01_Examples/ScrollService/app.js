'use strict';

(function () {

    angular.module('myApp', [])
        .controller("MainController", ["$scope", "$timeout", "scrollService", function($scope, $timeout, scrollService) {

            $scope.items = ["blob","blob","blob"];

            $scope.addRow =  function (){
                console.log('new row');
                $scope.items.push("blob");
            };
    }
    ]);


    angular.module('myApp')
        .factory("scrollService", ["$timeout", function scrollService($timeout) {

            return {

                /**
                 * Scroll and element to the bottom of the page
                 *@param containerId
                 *@param contentId
                 */
                scrollToBottom: function(containerId, contentId){

                    $timeout(function () {
                        var container = angular.element(containerId);
                        var content = angular.element(contentId);
                        container.scrollTop(content.height());
                    }, 0, false);
                }
            };

        }]);

})();