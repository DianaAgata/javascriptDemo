var passed=3;

var addTwo=function(){
var inner=2;
return passed+inner;
};

console.log(addTwo());

var passed=4;

console.log(addTwo());

console.dir(addTwo);