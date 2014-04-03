(function(root) {


  var Asteroids = root.Asteroids = (root.Asteroids || {} );

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = [];
    this.ship = new Asteroids.Ship();
    this.bullets = [];
    this.bomb = null;
    this.score = 0;
  }


  Game.prototype.addAsteroids = function(numAsteroids) {
    for(var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y, this.ship.pos));
    }
  };

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y)
    this.ctx.drawImage(img, 0, 0);
    this.drawScore();

    for(var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.ctx);
    }

    for (var j = 0; j < this.bullets.length; j++) {
      this.bullets[j].draw(this.ctx);
    }

    if (this.bomb)
      this.bomb.draw(this.ctx);

    this.ship.draw(this.ctx);
  };

  Game.prototype.move = function() {
    for(var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move();
      this.asteroids[i].screenWrap(Game.DIM_X, Game.DIM_Y);
    }

    for (var j = 0; j < this.bullets.length; j++) {
      this.bullets[j].move();
      this.bullets[j].hitAsteroids(j)

      if (this.bullets[j].offScreen(Game.DIM_X, Game.DIM_Y))
        this.bullets.splice(j, 1);
    }


    if (this.bomb)
      this.bomb.expandBomb(this);

    this.ship.move();
    this.ship.screenWrap(Game.DIM_X, Game.DIM_Y);
  };

  Game.prototype.step = function() {
    this.ship.color = Asteroids.Bullet.randColor();

    if(this.bomb)
      this.bomb.color = Asteroids.Bullet.randColor();

    this.bindKeyHandlers();
    this.move();
    this.draw();
    this.checkCollisions();
  };


  Game.prototype.start = function() {
    var that = this

    this.addAsteroids(20);
    this.intervalID = setInterval(function() { that.step() }, Game.FPS);
  }

  Game.DIM_X = 900
  Game.DIM_Y = 600
  Game.FPS = 30
  Game.SPEED = 1

  Game.prototype.checkCollisions = function() {
    for(var i = 0; i < this.asteroids.length; i++) {
      if(this.asteroids[i].isCollidedWith(this.ship)) {
        this.stop();
        alert("You dun goofed");
      }
    }
  }

  Game.prototype.stop = function() {
    clearInterval(this.intervalID)
  }

  Game.prototype.bindKeyHandlers = function() {
    var x = 0
    var y = 0

    if(key.isPressed("s"))
      y += Game.SPEED;
    if(key.isPressed("w"))
      y -= Game.SPEED;
    if(key.isPressed("a"))
      x -= Game.SPEED;
    if(key.isPressed("d"))
      x += Game.SPEED;


    this.ship.power([x,y])

    if(key.isPressed("f"))
      this.fireBullet();

    if(key.isPressed("b"))
      this.dropBomb();

    if(key.isPressed("t"))
      this.addAsteroids(2);

  }

  Game.prototype.fireBullet = function() {
    this.bullets.push(this.ship.fireBullet(this));
  }

  Game.prototype.dropBomb = function() {

    if (this.ship.bombs) {
      this.bomb = this.ship.dropBomb()
      this.ship.bombs -= 1;
    }
  }

  Game.prototype.removeAsteroid = function(idx) {
    this.asteroids.splice(idx, 1);
  }

  Game.prototype.removeBullet = function(idx) {
    this.bullets.splice(idx, 1);
  }


  Game.prototype.drawScore = function() {
    text = "Score: " + this.score
    ctx.font="20px Helvitica";
    this.ctx.fillText(text, 50, 50)


    text = "Bomb: " + this.ship.bombs
    this.ctx.fillText(text, 800, 50)
  }




})(window);