function makeAjaxRequest(url, callback){

    var handleRequest = function(response) {
        if(response.ok){
            return response.json()
        }else{
            return console.log("error")
        }
    };

    var handleResponse = function(jsonDataResponse){
        callback(jsonDataResponse);
    };

    fetch(url).then(handleRequest).then(handleResponse)

}

var handleResult = function(data){
    console.log(data);
};


makeAjaxRequest('jokes.json', handleResult);

