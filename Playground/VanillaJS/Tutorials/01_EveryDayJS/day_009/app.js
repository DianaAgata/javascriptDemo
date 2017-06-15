var participants = [];

var addPerson = document.getElementById('add-person');
var addPersonButn = document.getElementById('add-person-btn');
var participantsList = document.getElementById('participants-list');
var winner = document.getElementById('winner');
var extractBtn = document.getElementById('extract-btn');

addPersonButn.addEventListener("click", function() {
  if (addPerson.value.length) {
    addPerson.style.borderColor = "initial";
    participants.push(addPerson.value);
    console.log(participants);

    var paragraph = document.createElement("P");
    var text = document.createTextNode(addPerson.value);
    paragraph.appendChild(text);
    participantsList.appendChild(paragraph);
    addPerson.value = "";
  } else {
    addPerson.style.borderColor = "red";
  }
});

extractBtn.addEventListener("click", function() {
  function getRandomInt(number) {
    return Math.floor(Math.random() * (number + 1));
  }

  if(participants.length){
    var random = getRandomInt(participants.length - 1);
    winner.innerHTML = participants[random];
  }else{
    extractBtn.className = "btn btn-danger";
  }


});
