(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {} );

  var Bomb = Asteroids.Bomb = function (pos) {
    Asteroids.MovingObject.call(this, pos, [0,0], 7, "#FFFFFF")
}
  Bomb.inherits(Asteroids.MovingObject);

  Bomb.prototype.expandBomb = function (game) {
    this.radius += 5

    for(var i = 0; i < game.asteroids.length; i++) {
      if(game.asteroids[i].isCollidedWith(this)) {
        game.removeAsteroid(i);
        game.score += 1;
        break;
      }
    }

    if (this.radius > Bomb.MAXRADIUS) {
      game.bomb = null;
      //game.ship.bombs += 1;
    }
  }

  Bomb.MAXRADIUS = 400

})(this);