
function celestialBody(locationx,locationy,velocityx,velocityy,mass,radius,color) {
    this.locationX = locationx;
    this.locationY = locationy;
    this.velocityX = velocityx;
    this.velocityY = velocityy;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.mass = mass;
    this.radius = radius;
    this.color = color;
    this.G = 6.67 * pow(10,-11);
    this.stepSize = 0.01;
    this.pointX = [100];
    this.pointY = [100];
    this.trailIndex = 0;
    this.trailLength = 0;
    this.constTrailLength = 100;
    this.velColor = '#0eb774';
    this.accColor = '#c9145c';

    this.drawBody = function() {
        fill(this.color);
        noStroke();
        ellipse(this.locationX,this.locationY,2*this.radius,2*this.radius);
    }

    this.drawTrail = function() {
        stroke(color);
        for(var i = 0; i< this.trailLength; i++)
        {
            //point(this.pointX[i],this.pointY[i]);
            ellipse(this.pointX[i],this.pointY[i],5,5);
        }
    }

    this.drawVelVector = function() {

        stroke(this.velColor);
        line(this.locationX, this.locationY,this.locationX + this.velocityX/10,this.locationY + this.velocityY/10);
    }

    this.drawAccVector = function() {

        stroke(this.accColor);
        line(this.locationX, this.locationY, this.locationX + this.accelerationX /20, this.locationY + this.accelerationY/20);
    }

    this.addPointToTrail = function(x,y) {
        this.pointX[this.trailIndex] = x;
        this.pointY[this.trailIndex] = y;

        if(this.trailIndex >= this.constTrailLength -1)
        {
            this.trailIndex = 0;
        } else {
            this.trailIndex++;
        }

        if(this.trailLength < this.constTrailLength)
        {
            this.trailLength++;
        }
    }

    this.accX = function(mass,xPos,yPos)
    {
        var distance = sqrt(pow(this.locationX - xPos,2) + pow(this.locationY - yPos,2));
        return this.G * mass * (xPos-this.locationX) / pow(distance,3);
    }

    this.accY = function(mass,xPos,yPos)
    {
        var distance = sqrt(pow(this.locationX - xPos,2) + pow(this.locationY - yPos,2));
        return this.G * mass * (yPos-this.locationY) / pow(distance,3);
    }

    this.calculateVelocity = function(locationDataX,locationDataY,massData)
    {
        var accX = 0;
        var accY = 0;
        for (var i = 0; i < massData.length; i++)
        {
            if(locationDataX[i] == this.locationX && locationDataY[i] == this.locationY && this.mass == massData[i])
            {
                continue;
            } else 
            {
                accX += this.accX(massData[i],locationDataX[i],locationDataY[i]);
                accY += this.accY(massData[i],locationDataX[i],locationDataY[i]);
            }
        }

        this.velocityX += accX * this.stepSize;
        this.velocityY += accY * this.stepSize;
        this.locationX += this.velocityX * this.stepSize;
        this.locationY += this.velocityY * this.stepSize

        this.accelerationX = accX;
        this.accelerationY = accY;
        
        this.addPointToTrail(this.locationX,this.locationY);
    } 

    this.getVelocityX = function() {
        return this.velocityX;
    }

    this.getVelocityY = function() {
        return this.velocityY;
    }

    this.getLocationX = function() {
        return this.locationX;
    }

    this.getLocationY = function() {
        return this.locationY;
    }

    this.getMass = function() {
        return this.mass;
    }

    this.getRadius = function() {
        return this.radius;
    }

    this.setVelocityY = function(velY) {
        this.velocityY = velY
    }

    this.setVelocityX = function(velX) {
        this.velocityX = velX
    }
  
}