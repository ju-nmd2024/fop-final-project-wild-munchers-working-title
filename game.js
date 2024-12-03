let red;
let gameState = 'start';

let x = 100;
let y = 100;
let r = 100;

// Paddle variables
let paddleX = 350;
let paddleY = 570;
let paddleWidth = 125;
let paddleHeight =10;
let paddleSpeed = 2;


// Ball position variables
//let ballAcceleration = 0.2;
//let ballVelocityY = 0.2;
let muncherX = 400;
let muncherY = 550;
let rotation = 0;
let speed = 0;

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
  fill(255);
  rect(paddleX, paddleY, paddleWidth, paddleHeight);

  // Paddle collision coordinates

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
  push();
  stroke(250);
  strokeWeight(3);
  fill(red);
  textSize(40);
  text('HERE', 412, 330);
  pop();
}

function gameScreen() {
  //background(255, 140, 100);
  background(120,120,120);

  push();
  muncherBall(muncherX,muncherY,rotation);
  pop();
  paddle();
  paddleX=mouseX-60;
  muncherX=muncherX+Math.cos(rotation-1.57) * speed;
  muncherY=muncherY+Math.sin(rotation-1.5) * speed;
  

  // Ball's speed
  //ballVelocityY = ballVelocityY + ballAcceleration;
  speed=3;

}

function resultScreen() {
  background(255, 140, 0);
}





function mousePressed() {
  gameState = 'game';
  if (gameState === 'result'){
    gamestate = 'game';
  }
}
