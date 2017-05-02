(function () {
    var app = angular.module('githubViewer', []);

    var MainController = function ($scope, $http) {
        var userImg;

        var onUserComplete = function (response) {
            $scope.user = response.data;
            console.log('user logo', $scope.user.avatar_url);
            userImgURI = response.data.avatar_url;
        };


        var onImageComplete = function (response) {
            $http({
                method: 'GET',
                url: userImgURI,
                responseType: 'arraybuffer'
            }).then(function (response) {
                console.log(response);
                $scope.user.imageSTR = _arrayBufferToBase64(response.data);
                console.log($scope.user.imageSTR);
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

        var onComplete = function (response) {
            onUserComplete(response);
            onImageComplete(response);
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch the user ";
        };


        $http.get("https://api.github.com/users/javascript-society").then(onComplete,onError);

        $scope.username="angular";
        $scope.message = "GitHub Viewer";

    };

    app.controller("MainController", ["$scope", "$http", MainController]);


})();



