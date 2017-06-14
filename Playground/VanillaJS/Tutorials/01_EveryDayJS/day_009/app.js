var participants = [];

var addPerson = document.getElementById('add-person');
var addPersonButn = document.getElementById('add-person-btn');
var participantsList = document.getElementById('participants-list');
var winner = document.getElementById('winner');
var extractBtn = document.getElementById('extract-btn');

addPersonButn.addEventListener("click", function() {
  if(addPerson.value.length){
    addPerson.style.borderColor = "initial";
    participants.push(addPerson.value)
  }else{
    addPerson.style.borderColor = "red";
  }
});
