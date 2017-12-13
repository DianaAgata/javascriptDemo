function substract(a,b,callback){
    var x=a-b;
    callback(x);
}

substract(7,5,function(result){
    console.log("The result is " + result);
});