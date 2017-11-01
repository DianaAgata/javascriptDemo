var btn1 = document.createElement("BUTTON");
var t1 = document.createTextNode("CLICK ME 1");
btn1.appendChild(t1);
btn1.setAttribute("id", "CustomID1");

var btn2 = document.createElement("BUTTON");
var t2 = document.createTextNode("CLICK ME 2");
btn2.appendChild(t2);
btn2.setAttribute("id", "CustomID2");

document.getElementById('container').appendChild(btn1);
document.getElementById('container').appendChild(btn2);