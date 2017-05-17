var leftClicks = 0;
var rightClicks = 0;

var leftImage = document.getElementById("imgLeft");
var rightImage = document.getElementById("imgRight");
var leftCounter = document.getElementById("counterLeft");
var rightCounter = document.getElementById("counterRight");
var leftButton = document.getElementById("buttonLeft");
var rightButton = document.getElementById("buttonRight");

leftButton.addEventListener('click', function() {
  console.log('left');
  leftCounter.innerHTML = "Clicks: " + leftClicks++;
});

rightButton.addEventListener('click', function() {
  console.log('right');
  rightCounter.innerHTML = "Clicks: " + rightClicks++;
});
