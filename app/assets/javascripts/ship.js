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

Ship.prototype.draw = function(ctx) { 
var p1x = this.radius * Math.sin(this.rotation)*1.6; 
var p1y = this.radius * Math.cos(this.rotation)*1.6; 

var p2x = this.radius * Math.sin(this.rotation + 120 * (Math.PI / 180) )*1; 
var p2y = this.radius * Math.cos(this.rotation + 120 * (Math.PI / 180) )*1; 

var p3x = this.radius * Math.sin(this.rotation + 240 * (Math.PI / 180) )*1; 
var p3y = this.radius * Math.cos(this.rotation + 240 * (Math.PI / 180) )*1; 

ctx.fillStyle = this.color; 
ctx.beginPath(); 
ctx.moveTo(this.posx + p1x, this.posy + p1y); 
ctx.lineTo(this.posx + p2x, this.posy + p2y); 
ctx.lineTo(this.posx + p3x, this.posy + p3y); 
ctx.closePath(); 
ctx.fill(); 

ctx.fillStyle = this.color; 
ctx.beginPath(); 
ctx.arc( 
this.posx + p2x, 
this.posy + p2y, 
this.radius / 3, 
0, 
2 * Math.PI, 
false 
); 
ctx.fill(); 

ctx.fillStyle = Ship.COLOR; 
ctx.beginPath(); 
ctx.arc( 
this.posx + p3x, 
this.posy + p3y, 
this.radius / 3, 
0, 
2 * Math.PI, 
false 
); 
ctx.fill(); 
} 

})(window);