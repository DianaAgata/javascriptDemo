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

//debugger;
generateNumber();

document.getElementById('regenerate').addEventListener("click", generateNumber);
