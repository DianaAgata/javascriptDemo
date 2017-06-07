var clickListener = document.getElementById('p1');
var clickDisplay = document.getElementById('div1');
var clicks = 0;

var increment = function() {
  clickDisplay.innerHTML = clicks++;
}

clickListener.addEventListener("click", increment);
