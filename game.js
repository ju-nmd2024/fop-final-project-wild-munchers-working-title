let red;
let gameState = 'start';

let x = 100;
let y = 100;
let r = 100;

const foods = ["🌭","🍔","🍞","🥧"];
let score = 0;

// Paddle variables
let paddleX = 350;
let paddleY = 570;
let paddleWidth = 95;
let paddleHeight =20;
let paddleSpeed = 2;


// Ball position variables
let ballAcceleration = 0.2;
let ballVelocityY = 0.2;
let muncherX = 400;
let muncherY = 550;
let rotation = 0;

function setup() {
  createCanvas(800, 600);
  red = color(255, 55, 31);
}



function muncherBall(x, y, r) {
  push();
  translate(x, y);
  rotate(r);

  // Main body part
  push();
  stroke(0);
  strokeWeight(1);
  fill(240, 190, 0);
  ellipse(0, 0, 20);
  pop();

  // Teeth
  push();
  stroke(0); 
  strokeWeight(0.5); 
  fill(255);
  beginShape();
  vertex(-9, -4);
  bezierVertex(-5, -12, 5, -12, 9, -4);
  endShape();
  line(-9, -4, 9, -4);
  line(-7, -4, -4, -9);
  line(-3, -4, -4, -9);
  line(-3, -4, -1, -9);
  line(2, -4, 0, -9);
  line(2, -4, 4, -9);
  line(7, -4, 4, -9);
  pop();

  // Antenna
  push();
  stroke(0);
  strokeWeight(1); 
  fill(240, 190, 0);
  beginShape();
  vertex(-2, 6);
  bezierVertex(-1, 20, 1, 20, 2, 6);
  endShape();
  ellipse(0, 15, 6);
  pop();

  // Eyes
  stroke(0);
  strokeWeight(0.5);
  fill(255);
  push();
  translate(-6, -1);
  rotate(0.6);
  ellipse(0, 0, 6, 10);
  pop();

  push();
  translate(6, -1);
  rotate(-0.6);
  ellipse(0, 0, 6, 10);
  pop();

  // Irises
  push();
  noStroke(); 
  fill(0);
  translate(-6, -2);
  ellipse(0, 0, 3, 4);
  pop();

  push();
  noStroke(); 
  fill(0);
  translate(6, -2);
  ellipse(0, 0, 3, 4);
  pop();

  pop();
}


function paddle(){
  push();
  stroke(0);
  strokeWeight(0.5);
  fill(50,60,170);
  rect(paddleX, paddleY, paddleWidth, paddleHeight);
  pop();
}

function pointsCounter(){

}


function draw() {
  translate(0,0);
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
  text('Click anywhere', 412, 330);
}

function gameScreen() {
  clear(); 
  background(120,120,120);

  textSize(40);
  text(foods.join(""),20,100);
  
  push();
  muncherBall(muncherX,muncherY,rotation);
  pop();
  paddle();

  if (keyIsDown(LEFT_ARROW)) {
    paddleX -= 4; //Moves to the left
}

  if (keyIsDown(RIGHT_ARROW)) {
  paddleX += 4; //Moves to the left
}

  paddleX = constrain(paddleX, 0, 705);

  // Ball's speed
  ballVelocityY = ballVelocityY + ballAcceleration;


}

function resultScreen() {
  background(255, 140, 0);
}

function mousePressed() {
  gameState = 'game';
}

