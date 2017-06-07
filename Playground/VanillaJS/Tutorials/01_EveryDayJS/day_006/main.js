var nr1;
var nr2;

function generateRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function displayRandomNumber(elementId, nr) {
  document.getElementById(elementId).innerHTML = nr;
}

function generateNumber() {
  nr1 = generateRandomNumber();
  nr2 = generateRandomNumber();
  displayRandomNumber('nr1', nr1);
  displayRandomNumber('nr2', nr2);
}

function checkOperands() {
  if ((typeof nr1 != "undefined") && (typeof nr2 != "undefined")) {
    return true;
  }
  document.getElementById("displayResult").innerHTML = "please generate the numbers first";
  return false;

}

document.getElementById("regenerate").addEventListener("click", function() {
  generateNumber();
});

document.getElementById("add").addEventListener("click", function() {
  if (checkOperands()) {
    document.getElementById("displayResult").innerHTML = nr1 + nr2;
  }
});

document.getElementById("substract").addEventListener("click", function() {
  if (checkOperands()) {
    document.getElementById("displayResult").innerHTML = nr1 - nr2;
  }
});

document.getElementById("multiply").addEventListener("click", function() {
  if (checkOperands()) {
    document.getElementById("displayResult").innerHTML = nr1 * nr2;
  }
});

document.getElementById("divide").addEventListener("click", function() {

  if (nr2 === 0) {
    document.getElementById("displayResult").innerHTML = "devided by zero";
    return;
  }

  if (checkOperands()) {
    document.getElementById("displayResult").innerHTML = nr1 / nr2;
  }

}
});
