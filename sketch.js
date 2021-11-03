let rectSize = 100;

function setup() {
  createCanvas(400, 400);
  background('#87CEEB');
}

function mousePressed() {
  rectSize += 50;
}

function draw() {
  background('#87CEEB');
  fill(0);
  rect(100,100,rectSize,50);
  rectSize --;
}
