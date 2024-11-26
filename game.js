let red;

let gameState = 'start';


function setup() {
  createCanvas(800, 600);
  red = color(255, 55, 31);
}

function draw() {
  background(255, 140, 0);
  if (gameState === 'start') {
    startScreen();
  } else if (gameState === "game") {
    gameScreen();
  } else if (gameState === "result") {
    resultScreen();
  }
}

function startScreen() {
  background(0);

  //Start button
  stroke(250);
  strokeWeight(3);
  fill(red);
  textSize(40);
  text('HERE', 412, 330);
}

function gameScreen() {
  background(255, 140, 100);
}

function resultScreen() {
  background(255, 140, 0);
}
