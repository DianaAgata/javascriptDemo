var elem1 = document.getElementById('p1');
var elem2 = document.getElementById('p1');

console.log("typeof elem: ", typeof elem1);

console.log("elem1: ", elem1);

console.log("elem1.innerHTML: ", elem1.innerHTML);
elem1.innerHTML = "modified by JS";
console.log("elem1.innerHTML: ", elem1.innerHTML);

console.log("elem2.innerHTML before : ", elem2.innerHTML);
elem2.innerHTML = "modified by JS AGAIN";
console.log("elem2.innerHTML after: ", elem2.innerHTML);
console.log("elem1.innerHTML again: ", elem1.innerHTML);

// console.dir(elem1);
elem1 = null; //it only removes the refference
console.log(elem1);

// function addNumbers(a, b) {
//   console.log("a: " + a);
//   console.log("b: " + b);
//   return a + b;
// }
//
// console.log("before function call");
//
// var sum = addNumbers(5,7);
//
//
// console.log("sum: " + sum);
//
// // console.log("a",a);
//
// var sum2 = addNumbers(5);
//
// console.log("sum: " + sum2);

// console.log('hello');
//
// var myFirstVar=3;
// console.log("myFirstVar: ",myFirstVar);
//
// var myFirstString="hello";
// console.log("myFirstString: ",myFirstString);
//
// var myFirstB = true;
// console.log("myFirstB: ",myFirstB);
//
// var mySecondVar;
//
// mySecondVar = myFirstVar*2;
