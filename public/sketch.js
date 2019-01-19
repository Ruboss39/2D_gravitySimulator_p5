var bodyList = [];
var newBodyX;
var newBodyY;
var mouseDown = false;
var bounceFactor = 0.9

function setup() {
  frameRate(255);
  createCanvas(1920,1080);
  // put setup code here
  
  bodyList.push(new celestialBody(500,100,350,0,100000000,32,'#5090ff'));
  bodyList.push(new celestialBody(500,400,0,300,1000000000000000000,50,'#ffffff'));
  bodyList.push(new celestialBody(800,400,0,-300,1000000000000000000,50,'#ffffff'));
  bodyList.push(new celestialBody(500,759,-250,0,10000000,9,'#40ffd2'));
  bodyList.push(new celestialBody(500,900,250,0,100000000000,9,'#e82254'));
  bodyList.push(new celestialBody(0,10,250,0,100000000000,9,'#e82254'));
  bodyList.push(new celestialBody(500,10000,0,0,800000000000000000000,50,'#ffffff'));
  bodyList.push(new celestialBody(500,750,0,0,100000000000000000,35,'#ffffff'));

}

function draw() {
  background(51);
  calculateMovement();
  for(var i = 0; i < bodyList.length;i++)
  {
    bodyList[i].drawBody();
    bodyList[i].drawTrail();
    bodyList[i].drawVelVector();
    bodyList[i].drawAccVector();
  }
  drawTempBody();
  //drawGround(800);
  // put drawing code here
}

function drawGround(level) {
  fill('#5090ff');
  noStroke();
  rect(0,level,1920,1080);
}

function drawTempBody() {
  if(mouseDown) 
  {
    var tempRadius = Math.sqrt(Math.pow(newBodyX-mouseX,2) + Math.pow(newBodyY-mouseY,2));
    fill(color((mouseX - newBodyX) % 256,(mouseY - newBodyX) % 256,(mouseY - newBodyY) % 256));
    noStroke();
    ellipse(newBodyX,newBodyY,2*tempRadius,2*tempRadius);
  }
}

function writeLocation() {
  for(var i = 0; i < bodyList.length; i++)
  {
    text(bodyList[i].getLocationX(),10,10 + 20*i);
    text(bodyList[i].getLocationY(),10,20 + 20*i);
  }
}

function mousePressed() {
  newBodyX = mouseX;
  newBodyY = mouseY;
  mouseDown = true;
}

function mouseReleased() {
  var bodyColor = color((mouseX - newBodyX) % 256,(mouseY - newBodyX) % 256,(mouseY - newBodyY) % 256);
  var radius = Math.sqrt(Math.pow(newBodyX-mouseX,2) + Math.pow(newBodyY-mouseY,2));
  var velX = -mouseX + newBodyX;
  var velY = -mouseY + newBodyY;
  bodyList.push(new celestialBody(newBodyX,newBodyY,10*velX,10*velY,10,radius,bodyColor));
  mouseDown = false;

}

function calculateCollision() {

    for(var i = 0; i < bodyList.length; i++)
  {
    if (bodyList[i].getVelocityY() > 0 && bodyList[i].getLocationY() + bodyList[i].getRadius() > 800 )
    {
      bodyList[i].setVelocityY(bodyList[i].getVelocityY() *-1* bounceFactor);
      print("changed Velcoity")
    }
  }
}

function calculateMovement() {
  var locationXData = [];
  var locationYData = [];
  var massData = [];

  for(var i = 0; i < bodyList.length; i++)
  {
    locationXData.push(bodyList[i].getLocationX());
    locationYData.push(bodyList[i].getLocationY());
    massData.push(bodyList[i].getMass());
  }

  //calculateCollision()

  for(var i = 0; i < bodyList.length; i++)
  {
    if (bodyList[i].getMass() == 15 * Math.pow(10,12)) {
        continue;
    }
    bodyList[i].calculateVelocity(locationXData,locationYData,massData);
  }
}
