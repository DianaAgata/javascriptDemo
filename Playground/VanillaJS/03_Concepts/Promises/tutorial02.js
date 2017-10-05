let cleanRoom = function () {
    return new Promise(function (resolve, reject) {
        resolve(' Clean The Room');
    })
};

let removeGarbage = function (message) {
    return new Promise(function (resolve, reject) {
        resolve(message + ' Remove garbage');
    });
};

let winIcecream = function (message) {
    return new Promise(function (resolve, reject) {
        resolve(message + ' won Icecream');
    });
};

//sequential
cleanRoom().then(function (result) {
    return removeGarbage(result);
}).then(function (result) {
    return winIcecream(result);
}).then(function (result) {
    console.log('Finished! ' + result);
});

// //Parallel
// Promise.all([cleanRoom(),removeGarbage(),winIcecream()]).then(function(){
//     console.log('all finished!');
// });

// //Any of them finished
// Promise.race([cleanRoom(),removeGarbage(),winIcecream()]).then(function(){
//     console.log('One of them is finished');
// });




/*
    Example provided by : https://www.youtube.com/watch?v=s6SH72uAn3Q&t=323s
*/