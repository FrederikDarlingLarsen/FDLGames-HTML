
class Paddle {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.width = w;
    this.height = h;
  }
  
  render() {
    push();
    strokeWeight(3);
    stroke("cadetblue");
    fill("greenyellow");
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.width, this.height);
    pop();
  }
  
  update() {
    this.pos.add(this.vel);
    
    if (this.pos.x > width + this.width / 2)  {
      this.pos.x = -this.width / 2;
    } else if (this.pos.x < -this.width / 2) {
      this.pos.x = width + this.width / 2;
    }
  }
  
  setDir(dir) {
    this.vel.set(dir * 8, 0);  
  }
  
  reset() {
    this.pos.x = width / 2;
  }
  
 }






class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.speed = 3;
    this.vel = createVector(this.speed, -this.speed);
    this.r = 7;
  }

  render() {
    push();
    strokeWeight(3);
    stroke("rebeccapurple");
    fill("crimson");
    circle(this.pos.x, this.pos.y, this.r * 2);
    pop();
  }

  update() {
    this.pos.add(this.vel);
  }

  colliding(brick) {
    if (this.pos.x + this.r < brick.pos.x - brick.width / 2) {
      return false;
    } else if (this.pos.x - this.r > brick.pos.x + brick.width / 2) {
      return false;
    } else if (this.pos.y + this.r < brick.pos.y - brick.height / 2) {
      return false;
    } else if (this.pos.y - this.r > brick.pos.y + brick.height / 2) {
      return false;
    } else {
      return true;
    }
  }

  bounceOff(brick) {
    this.vel.x *= -1;
    this.update();

    var prevVel = this.vel.copy();

    if (this.colliding(brick)) {
      //console.log("bounce");
      this.vel.x *= -1;
      this.vel.y *= -1;
    }
    this.pos.sub(prevVel);
  }

  edges() {
    if (this.pos.x > width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x < this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    } else if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y *= -1;
    }
  }

  bounce(paddle) {
    if (this.pos.x > paddle.pos.x - paddle.width / 2 && this.pos.x < paddle.pos.x + paddle.width / 2 && this.pos.y + this.r > paddle.pos.y - paddle.height / 2 && this.pos.y < paddle.pos.y) {
      let relativeX = map(this.pos.x, paddle.pos.x - paddle.width / 2, paddle.pos.x + paddle.width / 2, -1, 1);
      this.vel.set(relativeX * this.speed, -this.speed);
    }
  }

  end() {
    if (this.pos.y > height) {
      lives--;
      this.reset();
      paddle.reset();
    }
    if (lives <= 0) {
      gameOver = true;
      gameStarted = false;
    }
  }

  won() {
    if (bricks.length === 0) {
      gameWon = true;
      gameOver = false;
      gameStarted = false;
      gameInfo = false;
    }
  }

  reset() {
    this.pos.x = width / 2;
    this.pos.y = height - 94;
    this.vel.set(this.speed, -this.speed);
  }

}





class Brick extends Paddle {
  constructor(x, y, w, h, points) {
    super(x, y ,w, h);
    this.points = points;
  }
  
  render() {
    push();
    strokeWeight(2);
    if (this.points === 1) {
      stroke("orchid");
      fill("plum");
    } else if (this.points === 2) {
      stroke("indianred");
      fill("lightcoral");
    } else if (this.points === 3) {
      stroke("darkorange");
      fill("orange");
    } else if (this.points === 4) {
      stroke("gold");
      fill("yellow");
    } else if (this.points === 5) {
      stroke("chartreuse");
      fill("greenyellow");
    } else if (this.points === 6) {
      stroke("darkturquoise");
      fill("turquoise");
    } else if (this.points === 7) {
      stroke("steelblue");
      fill("cadetblue");
    }
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.width-2, this.height-2);
    textAlign(CENTER, CENTER);
    textSize(15);
    noStroke();
    fill(0);
    text(this.points, this.pos.x, this.pos.y);
    pop();   
  }
}



 let ball;
let paddle;
let bricks = [];
let w, h;
let gameStarted = false;
let gameInfo = true;
let gameOver = false;
let gameWon = false;
let score = 0;
let lives = 3;

function setup() {
  createCanvas(640, 480);

  ball = new Ball(width / 2, height - 94);
  paddle = new Paddle(width / 2, height - 80, 90, 12);
  
  createBricks(1);
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    paddle.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    paddle.setDir(-1);
  }
  
  if (key == "1") {
    createBricks(1);
  } else if (key == "2") {
    createBricks(2);
  }
  
  if (keyCode === ENTER) {
    gameInfo = true;
    gameOver = false;
    gameStarted = false;
    gameWon = false;
    ball.reset();
    paddle.reset();
    createBricks(1);
    score = 0;
    lives = 3;
  }
  
  if (key === ' ') {
    gameStarted = true;
    gameInfo = false;
    gameWon = false;
    gameOver = false;
  }


}

function keyReleased() {
  paddle.setDir(0);
}

function draw() {
  const bkg = color("lightblue");
  background(red(bkg)/2, green(bkg)/2, blue(bkg)/2);
  
  for (let i = 0; i < lives; i++) {
    fill("LightPink");
    stroke("DeepPink");
    strokeWeight(3);
    circle(i*45 + 30, 35, 30);
  }
  
  textSize(30);
  fill("coral");
  stroke(0);
  strokeWeight(4);
  text("Score : " + score, width - 100, height / 4 - 80);
  strokeWeight(2);
  stroke("limegreen");
  text("Score : " + score, width - 100, height / 4 - 80);
  
  textSize(40);
  fill(255);
  strokeWeight(4);
  stroke("navy")
  text("Breakout Game!!", width / 2 - 10, height / 4 - 80);
  
  textSize(15);
  strokeWeight(2);
  fill("darkorange");  
  text("by : Abhay and Simon!", width - 80, height - 20);
  
  for (let brick of bricks) {
    brick.render();
  }
  ball.render();
  paddle.render();
  ball.edges();
  ball.end();
  ball.won();

  if (gameInfo && !gameStarted && !gameOver && !gameWon) {
    textAlign(CENTER, CENTER);
    textSize(20);
    fill("LightGoldenRodYellow");
    strokeWeight(3);
    stroke(0);
    text("use the arrow keys to move the paddle", width / 2, height / 2);
    text("use 1 and 2 to toggle levels", width / 2, height / 2 + 25);
    fill("Khaki");
    text("Press Space to start the game!!", width / 2, height / 2 + 50);
    ball.pos.x = paddle.pos.x;
  }

  //ball.update();

  if (gameStarted && !gameInfo && !gameOver && !gameWon) {
    paddle.update();
    ball.update();  
    ball.bounce(paddle);
    
    let ABBrick = false;
    for (let i = bricks.length - 1; i >= 0; i--) {
      let brick = bricks[i];
      if (ball.colliding(brick)) {
        if (ABBrick === false) {
          ball.bounceOff(brick);
          ABBrick = true;
        }
        score += brick.points;
        bricks.splice(i, 1);
      }
    }
  }
 
  if (gameOver && !gameStarted && !gameInfo && !gameWon) {
    fill("darkMagenta");
    textAlign(CENTER, CENTER);
    strokeWeight(5);
    stroke("firebrick");
    textSize(50);
    text("GAME IS OVER!!", width / 2, height / 2);
    fill("Khaki");
    textSize(20);
    text("press enter to play again!", width / 2, height / 2 + 75);
  }
  
  if (gameWon && !gameOver && !gameStarted && !gameInfo) {
    textAlign(CENTER, CENTER);
    textSize(70);
    stroke("Chartreuse");
    strokeWeight(6);
    fill("MediumSpringGreen");
    text("YOU WIN!!!!!", width / 2, height / 2);
    stroke(0);
    strokeWeight(3);
    text("YOU WIN!!!!!", width / 2, height / 2);
    fill("cyan");
    stroke(0);
    textSize(20);
    text("THAT WAS A GREAT ACHIVEMENT!!!", width / 2, height / 2 - 100);
    fill("Khaki");
    text("press enter to play again!", width / 2, height / 2 + 50);
    
  }

}

function createBricks(level) {
  if (level === 1) {
    bricks.splice(0);
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 7; j++) {
        w = width / 14;
        h = 15;
        bricks.push(new Brick(i * w + w / 2, j * h + h / 2 + 75, w, h, 7-j));
      }
    }
  } else if (level === 2) {
    bricks.splice(0);
    for (let j = 0; j < 14; j++) {
      for (let i = 0; i < j+1; i++) {
        w = width / 14;
        h = 15;
        bricks.push(new Brick(i * w + w / 2, j * h + h / 2 + 75, w, h, (2*(14-i)-1) % 8));
      }
    }
  }
}




