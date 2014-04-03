(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {} );

  var Bullet = Asteroids.Bullet = function (pos, vel, game) {
    this.game = game
    velX = vel[0] * Bullet.SPEED
    velY = vel[1] * Bullet.SPEED
    Asteroids.MovingObject.call(this, pos, [velX, velY], Bullet.RADIUS, Bullet.randColor())
  }

  Bullet.inherits(Asteroids.MovingObject);


  Bullet.prototype.offScreen = function(dimX, dimY) {
    if ((this.pos[0] > dimX) || (this.pos[0] < 0) || (this.pos[1] > dimY) || (this.pos[1] < 0))
      return true;
    return false;
  }


  Bullet.prototype.hitAsteroids = function(bullet_idx) {

    for(var i = 0; i < this.game.asteroids.length; i++) {
      if(this.game.asteroids[i].isCollidedWith(this)) {
        this.game.removeAsteroid(i);
        this.game.removeBullet(bullet_idx);
        this.game.score += 1;

        if (this.game.score % 50 === 0)
          this.game.ship.bombs += 1
        break;
      }
    }
  }


  Bullet.randColor = function() {
    var colorHex = Math.floor( Math.random() * 0xFFFFFF );
    return ("#" + colorHex.toString(16));
  }

  Bullet.RADIUS = 3
  Bullet.SPEED = 10




})(this);