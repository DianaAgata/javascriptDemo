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
  leftCounter.innerHTML = "Clicks: " + ++leftClicks;
  compareClicks();
});

rightButton.addEventListener('click', function() {
  debugger;
  console.log('right');
  rightCounter.innerHTML = "Clicks: " + ++rightClicks;
  compareClicks();
});

function compareClicks() {
  debugger;
  if (leftClicks < rightClicks) {
    leftImage.src = "img/sad.png";
    rightImage.src = "img/happy.png";
  } else if (leftClicks > rightClicks) {
    leftImage.src = "img/happy.png";
    rightImage.src = "img/sad.png";
  } else {
    leftImage.src = "img/sad.png";
    rightImage.src = "img/sad.png";
  }
}
