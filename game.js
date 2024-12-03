let red;
let gameState = 'game';

let x = 100;
let y = 100;
let r = 100;

const foods = ["🌭","🍔","🍞","🥧"];
let score = 0;
let lives = 3;


// Paddle variables
let paddleX = 350;
let paddleY = 570;
let paddleWidth = 125;
let paddleHeight =10;
let paddleSpeed = 2;


// Ball position variables
const bottomLimit = 580;
let ballAcceleration = 0.2;
let ballVelocityY = -4;
let ballVelocityX = 2;
let muncherX = 400;
let muncherY = 550;
let rotation = 0;

function setup() {
  createCanvas(800, 600);
  red = color(255, 55, 31);
}

function muncherBall(x,y,r){
push();
translate(x,y);
rotate(r);

  //main body part
  push();
  fill(240,190,0);
  ellipse(0,0,20);
  pop();

  //teeth
  push();
  fill(255);
  beginShape();
  vertex(-9,-4);
  bezierVertex(-5,-12,5,-12,9,-4);
  endShape();
  pop();
  line(-9,-4,9,-4);
  line(-7,-4,-4,-9);
  line(-3,-4,-4,-9);
  line(-3,-4,-1,-9);
  line(2,-4,0,-9);
  line(2,-4,4,-9);
  line(7,-4,4,-9);

  //antenna
  push();
  fill(240,190,0);
  beginShape();
  vertex(-2,6);
  bezierVertex(-1,20,1,20,2,6);
  endShape();
  ellipse(0,15,6);
  pop();

  //eyes
  push();
  translate(-6,-1);
  rotate(0.6);
  ellipse(0,0,6,10);
  pop();

  push();
  translate(6,-1);
  rotate(-0.6);
  ellipse(0,0,6,10);
  pop();

  //irises
  push();
  fill(0);
  translate(-6,-2);
  ellipse(0,0,3,4);
  pop();

  push();
  fill(0);
  translate(6,-2);
  ellipse(0,0,3,4);
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
  background(255);

  muncherX = 400;
  muncherY = 300;
  muncherSpeedX = 3;
  muncherSpeedY = -3;
  paddleX = 350;

  //Start button
  push();
  stroke(250);
  strokeWeight(3);
  fill(red);
  textSize(40);
  text('CLICK ANYWHERE TO START', width/2, 330);
  pop();
}

function gameScreen() {
  background(120,120,120);

  textSize(40);
  text(foods.join(""),20,100);

  push();
  muncherBall(muncherX,muncherY,rotation);
  pop();
  paddle();

  stroke(0);
  textSize(20);
  fill(255);
  text("Lives:", 20, 30); 
  text(lives, 80, 30); 


  if (keyIsDown(LEFT_ARROW)){
    paddleX -= 4.5; //Moves to the left
  }

  if (keyIsDown(RIGHT_ARROW)) {
    paddleX += 4.5; //Moves to the right
  }

  //limits the paddle to the borders
  paddleX = constrain(paddleX, 0, 680);

  //Bounces(screen)
  if(muncherX >= 790 || muncherX <= 10){
    ballVelocityX = - ballVelocityX;
    ballVelocityX = 1.2*ballVelocityX;
    }

    muncherX += ballVelocityX;

  if (muncherY <= 10){
    ballVelocityY = - ballVelocityY;
    ballVelocityY = 1.2 * ballVelocityY;
  }

  muncherY += ballVelocityY;

  //Bounces(paddle)
if (
  muncherY >= paddleY - 10 && 
  muncherX >= paddleX && 
  muncherX <= paddleX + paddleWidth 
) {
  ballVelocityY = -ballVelocityY; 
}

if (muncherY >= bottomLimit) {
  lives--; // Decrease lives
  if (lives <= 0) {
  gameState = 'result'; 
} else {
  // Reset ball position and velocity after losing a life
  muncherX = 400;
  muncherY = 550;
  ballVelocityY = -4;
  ballVelocityX = 2;
}
}
}

function resultScreen() {
  clear();
  push();
  background(0);
  stroke(250);
  strokeWeight(3);
  fill(red);
  textSize(40);
  text('GAME OVER', width / 2 , 330);
  pop();
  muncherX = 400;
  muncherY = 550;
  paddleX = 350;
  ballVelocityY = -4;
  ballVelocityX = 2;
}


function mousePressed() {
  if (gameState === 'start') {
    //Restart to original position
    muncherX = 400;
    muncherY = 550;
    ballVelocityY = -4; 
    ballVelocityX = 2; 
    lives = 3; 
    score = 0; 
    gameState = 'game';
  } else if (gameState === 'result') {
    //Restart to original position
    muncherX = 400;
    muncherY = 550;
    ballVelocityY = -4; 
    ballVelocityX = 2; 
    lives = 3; 
    score = 0; 
    gameState = 'start';
  }
}

