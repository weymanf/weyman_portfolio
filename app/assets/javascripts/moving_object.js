(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {} );

  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  }

  MovingObject.prototype.move = function() {

    this.pos[0] += this.vel[0]
    this.pos[1] += this.vel[1]
  }

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }


  MovingObject.prototype.isCollidedWith = function(otherObj) {
    var x = Math.abs(this.pos[0] - otherObj.pos[0]);
    var y = Math.abs(this.pos[1] - otherObj.pos[1]);
    var distance = Math.sqrt((x*x) + (y*y));

    if (this.radius + otherObj.radius > distance)
      return true;
    else
      return false
  };

  MovingObject.prototype.screenWrap = function(dimX, dimY) {
    if (this.pos[0] > dimX)
      this.pos[0] -= dimX;
    else if (this.pos[0] < 0)
      this.pos[0] += dimX;
    else if (this.pos[1] > dimY)
      this.pos[1] -= dimY;
    else if (this.pos[1] < 0)
      this.pos[1] += dimY
  }

})(this);