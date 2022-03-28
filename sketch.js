function createBat(){
 
  var thickness = 20;
  var batLength = 200;
  stroke(200);
fill(255,0,0);
rectMode(CENTER);
  

  if(mouseX <800-batLength/2 && mouseX > batLength/2){
    rect(mouseX,550,batLength,thickness);
  }
if(mouseX >800-batLength/2){
  rect(800-batLength/2,550,batLength,thickness);
}

if(mouseX < batLength/2){
  rect(batLength/2,550,batLength,thickness);
}
rectMode(CORNER);
}



 
 
var positionx = 400; 
var positiony = 200; 
var size = 30;
var Xspeed = 5;
var Yspeed= 2;
var lost = false;

function createBall(){

//let ball;
//ball = loadImage("goldBall.png");

   fill(0,0,255)
  //image(ball, 400,200,30,30);
  ellipse(positionx,positiony,size,size);
  
  positionx += Xspeed;
  positiony += Yspeed;
  
   if(positiony > 550-size+5 && positionx > mouseX-100 && positionx < mouseX+100){
  Yspeed = -Yspeed;
 }
 else if(positiony < 80+size/2){
   Yspeed = -Yspeed;
 }
  
  if(positionx > 800-size/2 || positionx < 0+size/2){
    Xspeed = -Xspeed;
  }
}







function createBlock(xposition, yposition, xsize, ysize, transparency, blockColor, ded){
  

  if(positionx > xposition &&  positionx < xposition +100 &&
     positiony > yposition &&  positiony < yposition +40){
  
       
       
       ded=true;
       
       /*
   if(transparency > 100){
transparency -=40;
score++;
}
else{
ded=true;
}*/
  }
  
  
    if(!ded){
  stroke(255,255,255);
  fill(blockColor,transparency);
  rect(xposition,yposition,xsize,ysize);
  
  }
  

}







var score = 0;
var lives = 5;
let bg;

function setup(){
createCanvas(800,600);




bg = loadImage("sarah.jpg");







}

function draw(){
//background(bg);
background(0);

 stroke(255,255,255);
 fill(0,0,0); 
 rect(0,0,800,80); 
  fill(255,255,255);
 textSize(42);
 text("Score: " + score, 20, 55);
 text("Lives: " + lives, 650, 55); 
 
 
createBall();
createBat();


var numOfXBlocks = 8;
var numOfYBlocks = 7;
var x = 0;
var y = 40;

for(var j = 0; j < numOfYBlocks; j++){
  y += 40;
  
  x = 0;
for(var i = 0; i < numOfXBlocks; i++){
  createBlock(x,y,100,40,200,255,false);
  x += 100;
  
}
}


if(lost){
lives--;
positionx = 300;
positiony = 200;
lost=false;
}

 
 if(positiony > 600){
 lost = true;
 }
 
 
}

