let red;
let gameState = 'game';

let x = 100;
let y = 100;
let r = 100;


let score = 0;


// Paddle variables
let paddleX = 350;
let paddleY = 570;
let paddleWidth = 125;
let paddleHeight =10;


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
translate(x,y);
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
  translate(6,-2);
  ellipse(0,0,3,4);
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
  text('CLICK ANYWHERE', Width/2, 330);
  pop();
}

function gameScreen() {
  background(120,120,120);
 
  push();
  muncherBall(muncherX,muncherY,rotation);
  pop();
  paddle();

  //the brick wall
  for (let amount = 0; amount < 17; amount++){
    rect(1.5 + amount * 47, 100,45,15);
    }
  for (let amount = 0; amount < 17; amount++){
    rect(1.5 + amount * 47, 117,45,15);
    }
  for (let amount = 0; amount < 17; amount++){
    rect(1.5 + amount * 47, 134,45,15);
    }
  for (let amount = 0; amount < 17; amount++){
    rect(1.5 + amount * 47, 151,45,15);
    }
  for (let amount = 0; amount < 17; amount++){
    rect(1.5 + amount * 47, 168,45,15);
    }
  for (let amount = 0; amount < 17; amount++){
    rect(1.5 + amount * 47, 185,45,15);
    }


  if (keyIsDown(LEFT_ARROW)){
    paddleX -= 4.5; //Moves to the left
  }

  if (keyIsDown(RIGHT_ARROW)) {
    paddleX += 4.5; //Moves to the right
  }

  //limits the paddle to the borders
  paddleX = constrain(paddleX, 0, 705);

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
  //muncherY = paddleY - 10; // Adjust position to avoid overlap
}

if (muncherY >= bottomLimit) {
  gameState = 'result'; 
}
}

function pointsCounter(){
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
  gameState = 'game';
  if (gameState === 'result'){
    gamestate = 'game';
  }
}
