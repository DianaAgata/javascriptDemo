var adding=function(passed){
	
  var add=function(inner){
  	return passed+inner;
  };
  
  return add;
};

var addTwo=new adding(2);
var addThree=new adding(3);

console.log(addTwo(5));
console.log(addThree(5));
