var moles = document.querySelectorAll('.mole');
var scoreBoard = document.querySelector('.score');
var startButton = document.querySelector('.start');
var count = 0;
var lastHole;

startButton.addEventListener('click', () => {
  count = 0;
  scoreBoard.innerHTML = 0;
  pop();
});

//event when you click a mole
moles.forEach(e => e.addEventListener('click', hit));

function pop() {
  if(count < 10000) {
    //pick a random hole
    var randomHole = getRandomHole();
    //assign it the up class to make a mole pop
    randomHole.classList.add('up');
    //hide the mole and make another mole pop after a random length of time
    var randomLength = Math.floor(Math.random() * (200 - 1000) + 1000);
    setTimeout(() => {
      randomHole.classList.remove('up');
      pop();
    }, randomLength);
    //add animation time to count
    count += randomLength;
    //save the hole to make sure to animate a different hole next time
    lastHole = randomHole;
  } else {
    alert('game over');
  }
}

//get a random hole
function getRandomHole() {
  var index = Math.floor(Math.random() * moles.length);
  var hole = moles[index];
  return (hole == lastHole) ? getRandomHole() : hole;
}

//increase score when you hit a mole
function hit(element) {
  scoreBoard.innerHTML++;
  this.classList.remove('up');
}
