let red;
let gameState = 'start';

let x = 100;
let y = 100;
let r = 100;

let score = 0;
let highScore = 0;
let lives = 3;

//Paddle variables
let paddleX = 350;
let paddleY = 570;
let paddleWidth = 225;
let paddleHeight =10;

//Ball position variables
const bottomLimit = 580;
let ballVelocityY = -2;
let ballVelocityX = 2;
let muncherX = 400;
let muncherY = 550;
let rotation = 0;

//food OOP
class Brick {
  constructor(x,y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    push();
    fill(200,80,80);
    rect(this.x,this.y,this.width,this.height);
    pop();
  }
}
let bricks = [];

const foodsX = [1.5,48.5,95.5,142.5,189.5,236.5,283.5,330.5,377.5,424.5,471.5,518.5,565.5,612.5,659.5,706.5,753.5];
const foodsY = [100,117,134,151,168,185];
console.log(foodsX.length);

let food1 = new Brick(foodsX[0],100);
let food2 = new Brick(foodsX[1],100);
let food3 = new Brick(95.5,100);


function setup() {
  createCanvas(850, 600);
  red = color(255, 55, 31);
  red2 = color(25, 155, 31);
  muncher = new MuncherBall(400, 550, 0);

  //wall of bricks
  for (let i = 0; i < 18; i++) {
  const bricksX = 0 + i * (45+2);
  for (let j = 0; j < 6; j++){
    const bricksY = 100 + j * (15+2);
    const newBrick = new Brick(bricksX,bricksY, 45, 15);
    bricks.push(newBrick); 
  }
}

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

let muncher; 

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
  background(255,255,160);

  muncherX = 400;
  muncherY = 300;
  muncherSpeedX = 3;
  muncherSpeedY = -3;
  paddleX = 350;

push();
stroke(red2);
strokeWeight(3);
fill(red);
textSize(25);
text('BRICK MUNCHER', 280, 300, 380);
pop();

}

function gameScreen() {
  background(120,120,120);

  muncher.display();
  paddle();

  stroke(0);
  textSize(20);
  fill(255);
  text("Lives:", 30, 30); 
  text(lives, 75, 30); 

  text("Score:", 165, 30); 
  text(score, 210, 30); 

  text("Highest Score:", 360, 30); 
  text(highScore, 445, 30); 


  if (keyIsDown(LEFT_ARROW)){
    paddleX -= 4.5; //Moves to the left
  }

  if (keyIsDown(RIGHT_ARROW)) {
    paddleX += 4.5; //Moves to the right
  }

  //limits the paddle to the borders
  paddleX = constrain(paddleX, 0, 630);

  //Bounces(screen)
  if(muncher.x >= 830 || muncher.x <= 10){
    ballVelocityX = - ballVelocityX;
    ballVelocityX = 1.1 * ballVelocityX;
    }
  muncher.x += ballVelocityX;

  if (muncher.y <= 10){
    ballVelocityY = - ballVelocityY;
    ballVelocityY = 1.1 * ballVelocityY;
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

ballVelocityY = constrain(ballVelocityY, -4, 4);
ballVelocityX = constrain(ballVelocityX, -4, 4);

//Brick collision
for (let i = bricks.length - 1; i >= 0; i--) {
  let brick = bricks[i];
  brick.draw();
  
  //Check for collision
  if (muncher.x + 10 > brick.x && muncher.x - 10 < brick.x + brick.width && 
      muncher.y + 10 > brick.y && muncher.y - 10 < brick.y + brick.height) {
    
    bricks.splice(i, 1); //Remove the brick from the array
    score++;

    //Bounce the ball depending on the side of the brick it hits
    if (muncher.x < brick.x || muncher.x > brick.x + brick.width) {
      ballVelocityX = -ballVelocityX; //Reverse X direction
    } else {
      ballVelocityY = -ballVelocityY; //Reverse Y direction
    }
  }
}


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

  muncher.y += ballVelocityY;
}

function resultScreen() {
  clear();
  background(0);
  fill(255);
  textSize(50);
  textAlign(CENTER);
  text("Game Over!", 400, 200);
  textSize(30);
  if (score > highScore) {
    highScore = score;
  }
  textSize(20);
  text("Score", 400, 300);
  text(score, 400, 330);
  text("Highest Score", 400 , 390);
  text(highScore, 400, 420);

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

function mousePressed() {if (gameState === 'start') {
  //Restart to original position
  muncherX = 400;
  muncherY = 550;
  ballVelocityY = -4; 
  ballVelocityX = 2; 
  lives = 3; 
  score = 0; 
  gameState = 'game';
} else if(gameState === "result") {
  //Restart to original position
  muncherX = 400;
  muncherY = 550;
  ballVelocityY = -4; 
  ballVelocityX = 2; 
  lives = 3; 
  score = 0; 
    gameState = "game";
    score = 0;
    lives = 3;
    bricks = [];
    for (let i = 0; i < 18; i++) {
      const bricksX = 0 + i * (45 + 2);
      for (let j = 0; j < 6; j++) {
        const bricksY = 100 + j * (15 + 2);
        const newBrick = new Brick(bricksX, bricksY, 45, 15);
        bricks.push(newBrick);
      }
    }
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



/* REFERENCES
Bounces: 
https://editor.p5js.org/icm/sketches/BJKWv5Tn
https://chatgpt.com/share/67522468-cee8-8013-bcb0-099d1adee475

//Speed
https://chatgpt.com/share/675252bb-7284-8013-af9e-0b68c2b5c53b
*/