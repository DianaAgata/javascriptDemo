console.log('start program');

let promiseToCleanTheRoom = new Promise(
    function (resolve, reject) {

        //cleaning the room

        let isClean = true;

        if (isClean) {
            resolve('Clean');
        } else {
            reject('not Clean');
        }

    }
);

promiseToCleanTheRoom.then(function (fromResolve) {
    console.log('the room is ' + fromResolve);
}).catch(function (fromReject) {
    console.log('the room is ' + fromReject);
});


/*
Example provided by : https://www.youtube.com/watch?v=s6SH72uAn3Q&t=323s
 */