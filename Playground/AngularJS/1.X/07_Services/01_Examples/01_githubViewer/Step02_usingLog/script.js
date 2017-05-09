(function () {
    var app = angular.module('githubViewer', []);

    var MainController = function ($scope, $http, $interval, $log) {
        var userImg;

        var onUserComplete = function (response) {
            $scope.user = response.data;
            console.log('user logo', $scope.user.avatar_url);
            userImgURI = response.data.avatar_url;

            $http.get($scope.user.repos_url).then(onRepos, onError);
        };

        var onRepos = function (response) {
            $scope.repos = response.data;
        };
        var onImageComplete = function (response) {
            $http({
                method: 'GET',
                url: userImgURI,
                responseType: 'arraybuffer'
            }).then(function (response) {
                // console.log(response);
                $scope.user.imageSTR = _arrayBufferToBase64(response.data);
                // console.log($scope.user.imageSTR);
                // str is base64 encoded.
            }, function (response) {
                console.error('error in getting static img.');
            });


            function _arrayBufferToBase64(buffer) {
                var binary = '';
                var bytes = new Uint8Array(buffer);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return window.btoa(binary);
            }
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch the data ";
        };

        var onComplete = function (response) {
            onUserComplete(response);
            onImageComplete(response);

        };


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

            $http({

                method: 'GET',
                url: "https://api.github.com/users/" + username,
                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(onComplete, onError);

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

    app.controller("MainController", ["$scope", "$http", "$interval", "$log", MainController]);


})();



