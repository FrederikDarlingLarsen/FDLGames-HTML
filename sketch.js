// Variables
var positionx = 400;
var positiony = 200;
var size = 20;
var Xspeed = 6;
var Yspeed= 6;
var lost = false;

var score = 0;
var lives = 3;

var batLength = 150;
var thickness = 20;

// Function for creating the bat
function createBat() {

  // Color and centering
  stroke(200);
  fill(255);
  rectMode(CENTER);

  // If-statements using mouseX and mouseY for moving the bat
  if (mouseY <800-batLength/2 && mouseY > batLength/2+80) {
    rect(50, mouseY, thickness, batLength);
  }

  if (mouseY >600-batLength/2) {
    rect(50, 600-batLength/2, thickness, batLength);
  }

  if (mouseY < batLength/2+80) {
    rect(50, batLength/2+80, thickness, batLength);
  }

  // Set rect() back to drawing from the corner
  rectMode(CORNER);
}

// Function for creating the other bat
function createBat2() {

  // Color and centering
  stroke(200);
  fill(255);
  rectMode(CENTER);
  
  // If-statements using mouseX and mouseY for moving the bat
  if (mouseX <800-batLength/2 && mouseX > batLength/2+80) {
    rect(750, mouseX, thickness, batLength);
  }

  if (mouseX >600-batLength/2) {
    rect(750, 600-batLength/2, thickness, batLength);
  }

  if (mouseX < batLength/2+80) {
    rect(750, batLength/2+80, thickness, batLength);
  }
  
  // Set rect() back to drawing from the corner
  rectMode(CORNER);
}

// Function for creating the ball
function createBall() {

  // Drawing the ellipse with white fill
  fill(255);
  ellipse(positionx, positiony, size, size);

  // Adding the speeds to the position coordinates
  positionx += Xspeed;
  positiony += Yspeed;


  // If-statements for changing the position of the ball when hitting a wall or bat
  if (positiony > 600-size/2) {
    Yspeed = -Yspeed;
  } 
  else if (positiony < 80+size/2) {
    Yspeed = -Yspeed;
  } 
  else if (positionx > 800-50-size/2 && 
           positiony < mouseX+batLength/2 && 
           positiony > mouseX-batLength/2){
    Xspeed = -Xspeed;
    score++;
  }
  else if(positionx < 50+thickness-size/2 && 
          positiony < mouseY+batLength/2 && 
          positiony > mouseY-batLength/2) {
    Xspeed = -Xspeed;
    score++;
  }
}


function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  stroke(255, 255, 255);
  fill(0, 0, 0);
  rect(0, 0, 800, 80);
  fill(255, 255, 255);
  textSize(36);
  text("Score: " + score, 20, 53);
  textSize(48);
  text("AXIS PONG", 260, 58);
  textSize(36);
  text("Lives: " + lives, 650, 53);

  createBall();
  createBat();
  createBat2();

  if (lost) {
    lives--;
    positionx = 300;
    positiony = 200;
    lost=false;
  }

  if (positionx > 800 || positionx < 0) {
    lost = true;
  }

  if(lives <= 0) {
    textSize(60);
    text("GAME OVER", 205, 300);
    textSize(18);
    text("Press any key to play again", 275, 350);
    Xspeed = 0;
    Yspeed= 0;
  }
}

function keyPressed() {
  if (lives <= 0) {
    lives = 3;
    Xspeed = 6;
    Yspeed= 6;
    score=0;
  }
}