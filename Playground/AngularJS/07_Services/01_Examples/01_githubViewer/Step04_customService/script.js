(function () {
    var app = angular.module('githubViewer', []);

    var MainController = function ($scope, github , $interval, $log, $anchorScroll, $location) {
        var userImg;

        var onUserComplete = function (data) {
            $scope.user = data;
            github.getRepos(data).then(onRepos, onError);
        };

        var onRepos = function (data) {
            $scope.repos = data;
            $location.hash("userDetails");
            $anchorScroll();
        };

        // var onImageComplete = function (response) {
        //     $http({
        //         method: 'GET',
        //         url: userImgURI,
        //         responseType: 'arraybuffer'
        //     }).then(function (response) {
        //         // console.log(response);
        //         $scope.user.imageSTR = _arrayBufferToBase64(response.data);
        //         // console.log($scope.user.imageSTR);
        //         // str is base64 encoded.
        //     }, function (response) {
        //         console.error('error in getting static img.');
        //     });
        //
        //
        //     function _arrayBufferToBase64(buffer) {
        //         var binary = '';
        //         var bytes = new Uint8Array(buffer);
        //         var len = bytes.byteLength;
        //         for (var i = 0; i < len; i++) {
        //             binary += String.fromCharCode(bytes[i]);
        //         }
        //         return window.btoa(binary);
        //     }
        // };

        var onError = function (reason) {
            $scope.error = "Could not fetch the data ";
        };

        // var onComplete = function (data) {
        //     onUserComplete(data);
        //     onImageComplete(data);
        //
        // };


        var decrementCountdown = function () {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        };

        var countdownInterval = null;
        var startCountdown = function () {
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        };

        $scope.search = function (username) {
            $log.info("Searching for " + username);

            github.getUser(username).then(onUserComplete, onError);

            if (countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }

        };


        $scope.username = "angular";
        $scope.message = "GitHub Viewer";
        $scope.repoSortOrder = '-stargazers_count';
        $scope.countdown = 10;
        startCountdown();

    };

    app.controller("MainController", ["$scope", "github", "$interval", "$log", "$anchorScroll", "$location", MainController]);


})();



