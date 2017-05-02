(function () {

    var github = function ($http) {

        var getUser = function (username) {

            return $http.get("https://api.github.com/users/" + username).then(function (response) {

                console.log('user logo URL', response.data.avatar_url);

                var getPicture = function () {
                    $http({
                        method: 'GET',
                        url: response.data.avatar_url,
                        responseType: 'arraybuffer'
                    }).then(function (response) {
                        // console.log(response);
                        response.data.userImgDecoded = _arrayBufferToBase64(response.data);
                        console.log("response.data.userImgDecoded", response.data.userImgDecoded);

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

                getPicture();

                console.log('response.data',response.data);

                return response.data;


            });



        };

        var getRepos = function (user) {
            return $http.get(user.repos_url).then(function (response) {
                return response.data;
            });
        };


        return {
            getUser: getUser,
            getRepos: getRepos
        };
    };

    var module = angular.module("githubViewer");

    module.factory("github", github);

})();