let red;
let gameState = 'result';

let x = 100;
let y = 100;
let r = 100;

let score = 0;
let highScore = 0;
let lives = 3;

//Paddle variables
let paddleX = 350;
let paddleY = 570;
let paddleWidth = 125;
let paddleHeight =10;

//Ball position variables
const bottomLimit = 580;
let ballAcceleration = 0.2;
let ballVelocityY = -2;
let ballVelocityX = 2;
let muncherX = 400;
let muncherY = 550;
let rotation = 0;

//food array or simple object
const foods = {
  width: 45,
  height: 15,
  row: {r1: 100, r2: 117, r3: 134, r4: 151, r5: 168, r6: 185,},
  spacing: 47,
};

let muncher; 

function setup() {
  createCanvas(800, 600);
  red = color(255, 55, 31);
  muncher = new MuncherBall(400, 550, 0);
}

class MuncherBall {
  constructor(x, y, r) {
    this.x = x;
    this.y = y; 
    this.r = r;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.r);

    //Body
    push();
    fill(240, 190, 0);
    ellipse(0, 0, 20);
    pop();

    //Teeth
    push();
    fill(255);
    beginShape();
    vertex(-9, -4);
    bezierVertex(-5, -12, 5, -12, 9, -4);
    endShape();
    pop();
    line(-9, -4, 9, -4);
    line(-7, -4, -4, -9);
    line(-3, -4, -4, -9);
    line(-3, -4, -1, -9);
    line(2, -4, 0, -9);
    line(2, -4, 4, -9);
    line(7, -4, 4, -9);

    //Antenna
    push();
    fill(240, 190, 0);
    beginShape();
    vertex(-2, 6);
    bezierVertex(-1, 20, 1, 20, 2, 6);
    endShape();
    ellipse(0, 15, 6);
    pop();

    //Eyes
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
    translate(-6, -2);
    ellipse(0, 0, 3, 4);
    translate(12, 0);
    ellipse(0, 0, 3, 4);
    pop();
    pop();
  }
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
  textAlign(CENTER);
  text('CLICK ANYWHERE TO START', width/2-195, 330,380);
  pop();
}

function gameScreen() {
  background(120,120,120);

  muncher.display();
  paddle();

  stroke(0);
  textSize(20);
  fill(255);
  text("Lives:", 20, 30); 
  text(lives, 80, 30); 

  text("Score:", 150, 30); 
  text(score, 210, 30); 

  text("Highest Score:", 360, 30); 
  text(highScore, 480, 30); 


  if (keyIsDown(LEFT_ARROW)){
    paddleX -= 4.5; //Moves to the left
  }

  if (keyIsDown(RIGHT_ARROW)) {
    paddleX += 4.5; //Moves to the right
  }

  //limits the paddle to the borders
  paddleX = constrain(paddleX, 0, 680);

  //Bounces(screen)
  if(muncher.x >= 790 || muncher.x <= 10){
    ballVelocityX = - ballVelocityX;
    ballVelocityX = 1.2*ballVelocityX;
    }
  muncher.x += ballVelocityX;

  if (muncherY <= 10){
    ballVelocityY = - ballVelocityY;
    ballVelocityY = 1.2 * ballVelocityY;
  }
  muncher.y += ballVelocityY;

  //Bounces(paddle)
if (
  muncher.y >= paddleY - 10 && 
  muncher.x >= paddleX && 
  muncher.x <= paddleX + paddleWidth 
) {
  ballVelocityY = - ballVelocityY; 
}


//If no more food remains, transition to result screen
//if (foods.length === 0) {
// gameState = 'result';}

 for (let amount = 0; amount < 17; amount++){
  push();
  fill(200,80,80);
  rect(1.5 + amount * foods.spacing, foods.row.r1,foods.width,foods.height);
  rect(1.5 + amount * foods.spacing, foods.row.r2,foods.width,foods.height);
  rect(1.5 + amount * foods.spacing, foods.row.r3,foods.width,foods.height);
  rect(1.5 + amount * foods.spacing, foods.row.r4,foods.width,foods.height);
  rect(1.5 + amount * foods.spacing, foods.row.r5,foods.width,foods.height);
  rect(1.5 + amount * foods.spacing, foods.row.r6,foods.width,foods.height);
  pop();
}

// Collision with food

if (muncher.y >= bottomLimit) {
  lives--; //Decrease lives
  if (lives <= 0) {
  gameState = 'result'; 
} else {
  //Reset ball position and velocity after losing a life
  muncher.x = 400;
  muncher.y = 550;
  ballVelocityY = -4;
  ballVelocityX = 2;
}

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
  if(muncher.x >= 790 || muncher.x <= 10){
    ballVelocityX = - ballVelocityX;
    ballVelocityX = 1.2*ballVelocityX;
    }

    muncher.x += ballVelocityX;

  if (muncher.y <= 10){
    ballVelocityY = - ballVelocityY;
    ballVelocityY = 1.2 * ballVelocityY;
  }

  muncher.y += ballVelocityY;

  //Bounces(paddle)
if (
  muncher.y >= paddleY - 10 && 
  muncher.x >= paddleX && 
  muncher.x <= paddleX + paddleWidth 
) {
  ballVelocityY = -ballVelocityY; 
  //muncherY = paddleY - 10; // Adjust position to avoid overlap
}}

function resultScreen() {
  clear();
  background(0);
  fill(red);
  textSize(40);
  textAlign(CENTER, CENTER);
  text('GAME OVER', width / 2, height / 3);

  fill(255);
  textSize(20);
  text("Score", width / 2 , 300);
  text(score, width / 2, 330);
  text("Highest Score", width / 2 , 390);
  text(highScore, width / 2, 420);

  muncherX = 400;
  muncherY = 550;
  paddleX = 350;
  ballVelocityY = - 4;
  ballVelocityX = 2;


  //Update high score
   if (score > highScore) {
    highScore = score;
  }

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



//REFERENCES
//Bounces: https://editor.p5js.org/icm/sketches/BJKWv5Tn