(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {} );

  var Ship = Asteroids.Ship = function () {
    this.bombs = 1
    Asteroids.MovingObject.call(this, Ship.STARTINGPOS, [0, 0], Ship.RADIUS, Ship.COLOR)
  }

  Ship.inherits(Asteroids.MovingObject);


  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];

    if(this.vel[0] > Ship.MAXSPEED)
      this.vel[0] = Ship.MAXSPEED
    else if(this.vel[0] < -Ship.MAXSPEED)
      this.vel[0] = -Ship.MAXSPEED

    if(this.vel[1] > Ship.MAXSPEED)
      this.vel[1] = Ship.MAXSPEED
    else if(this.vel[1] < -Ship.MAXSPEED)
      this.vel[1] = -Ship.MAXSPEED
  }

  Ship.prototype.fireBullet = function(game) {
    var speed = Math.sqrt((this.vel[0] * this.vel[0]) + (this.vel[1] * this.vel[1]) )
    var dirX = this.vel[0] / speed
    var dirY = this.vel[1] / speed

    var pos_x = this.pos[0]
    var pos_y = this.pos[1]

    if (!(this.vel[0] === 0 && this.vel[1] === 0))
      return new Asteroids.Bullet([pos_x, pos_y], [dirX, dirY], game)
    else
      return new Asteroids.Bullet([pos_x, pos_y], [0, 1], game)
  }


  Ship.prototype.dropBomb = function() {
    x = this.pos[0]
    y = this.pos[1]


    return new Asteroids.Bomb([x, y])
  }



Ship.STARTINGPOS = [450, 300]
Ship.RADIUS = 7
Ship.COLOR = "#DD7ED8"
Ship.MAXSPEED = 6

})(this);