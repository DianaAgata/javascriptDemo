// alert('hello world');
// console.log('hello world from the console');
// console.log('hello again from the console');

var init1 = function(event) {
  console.log('DOM1 function');
  console.log(document.getElementById('demo'));
  console.log(document.getElementById('img-1'));
};



var init2 = function(event) {
  console.log('DOM2 function');
  console.log(document.getElementById('demo'));
  console.log(document.getElementById('img-1'));
};

document.addEventListener("DOMContentLoaded", init2);
document.addEventListener("DOMContentLoaded", init1);


console.log('before loading DOM :',document.getElementById('demo'));


document
