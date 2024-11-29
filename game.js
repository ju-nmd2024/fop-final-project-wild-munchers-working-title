let red;
let gameState = 'game';

let x = 100;
let y = 100;
let r = 100;

//ball position variables
let muncherX = 0;
let muncherY = 0;
let rotation = 0;
function setup() {
  createCanvas(800, 600);
  red = color(255, 55, 31);
}

function muncherBall(x,y,r){
translate(x,y);
rotate(r);

  //main body part
  push();
  fill(240,190,0);
  ellipse(x,y,20);
  pop();

  //teeth
  push();
  fill(255);
  beginShape();
  vertex(x-9,y-4);
  bezierVertex(x-5,y-12,x+5,y-12,x+9,y-4);
  endShape();
  pop();
  line(x-9,y-4,x+9,y-4);
  line(x-7,y-4,x-4,y-9);
  line(x-3,y-4,x-4,y-9);
  line(x-3,y-4,x-1,y-9);
  line(x+2,y-4,x,y-9);
  line(x+2,y-4,x+4,y-9);
  line(x+7,y-4,x+4,y-9);

  //antenna
  push();
  fill(240,190,0);
  beginShape();
  vertex(x-2,y+6);
  bezierVertex(x-1,y+20,x+1,y+20,x+2,y+6);
  endShape();
  ellipse(x,y+15,6);
  pop();

  //eyes
  push();
  translate(x-6,y-1);
  rotate(0.6);
  ellipse(0,0,6,10);
  pop();

  push();
  translate(x+6,y-1);
  rotate(-0.6);
  ellipse(0,0,6,10);
  pop();

  //irises
  push();
  fill(0);
  translate(x-6,y-2);
  ellipse(0,0,3,4);
  pop();

  push();
  fill(0);
  translate(x+6,y-2);
  ellipse(0,0,3,4);
  pop();
}

function foods(){

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
  text('HERE', 412, 330);
}

function gameScreen() {
  //background(255, 140, 100);
  background(120,120,120);
  
  push();
  translate(100,150);
  muncherBall(muncherX,muncherY,rotation);
  rotate(rotation);
  pop();
}

function resultScreen() {
  background(255, 140, 0);
}
