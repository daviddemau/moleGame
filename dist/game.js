// variables
let moles = document.querySelectorAll('.mole');
let scoreBoard = document.querySelector('.score');
let startButton = document.querySelector('.start');
let optionsArea = document.querySelector('.options');
let selectDifficultyTab = document.querySelector('.choose');
let count = 0;
let lastHole;
let randomHole;
let randomLength;


// restart game with new data
startButton.addEventListener('click', () => {
  optionsArea.style.display = 'none';
  count = 0;
  scoreBoard.innerHTML = 0;
  pop();
});

// event when you hit a mole
moles.forEach(e => e.addEventListener('click', hit));

function pop() {
  if(count < 15000) {

    // pick a random hole different from previous one
    randomHole = getRandomHole();

    // assign it the up class for the mole to pop on screen
    randomHole.classList.add('up');

    // change moles speed based on game difficulty
    if(selectDifficultyTab.value === 'easy') {
      randomLength = Math.floor(Math.random() * (800 - 1000) + 1000);
    } else if(selectDifficultyTab.value === 'medium') {
      randomLength = Math.floor(Math.random() * (200 - 1000) + 1000);
    } else if(selectDifficultyTab.value === 'hard') {
      randomLength = Math.floor(Math.random() * (200 - 500) + 500);
    }

    //make new mole appear and current one disappear after random length of time
    setTimeout(gameStarts, randomLength);

    //keep the game under time limit
    count += randomLength;

    //save the hole to animate a different one next time
    lastHole = randomHole;
  } else {
    alert('game over');
    optionsArea.style.display = 'block';
  }
}

function gameStarts() {
  randomHole.classList.remove('up');
  pop();
}

//get a random hole
function getRandomHole() {
  let index = Math.floor(Math.random() * moles.length);
  let hole = moles[index];
  return (hole === lastHole) ? getRandomHole() : hole;
}

function hit() {
  scoreBoard.innerHTML++;
  this.classList.remove('up');
}

//add sound effects
document.querySelector('.main').addEventListener('click', () => {
  play();
})

function play() {
  let gunShot = new Audio('sounds/gun-gunshot-02.mp3');
    if (gunShot.paused) {
        gunShot.play();
    } else {
        gunShot.pause();
        gunShot.currentTime = 0
    }
}
