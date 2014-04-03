(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {} );

  var Asteroid = Asteroids.Asteroid = function (pos, vel) {
    var randNum = Math.floor(Math.random() * 3)
    Asteroids.MovingObject.call(this, pos, vel, Asteroid.randomRadius(), Asteroid.COLOR[randNum])
  }

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function(dimX, dimY, shipPos) {
    pos = [ Math.random() * dimX, Math.random() * dimY ]

    if (Math.abs(pos[0] - shipPos[0]) < 75)
      pos[0] += 150

    if (Math.abs(pos[1] - shipPos[1]) < 75)
      pos[1] += 150

    vel = randVel();

    return new Asteroid(pos, vel);
  }

  var randVel = function() {
    dx = Math.random() * Asteroid.MAXSPEED
    if (Math.random() * 2 > 1)
      dx = -dx

    dy = Math.random() * Asteroid.MAXSPEED
    if (Math.random() * 2 > 1)
      dy = -dy

    return [dx, dy]
  }

  Asteroid.randomRadius = function() {
    return Math.random() * Asteroid.MAXRADIUS + 10;
  }


  Asteroid.COLOR = ["#2F00AB", "#FFF000", "#00E995"]
  Asteroid.MAXRADIUS = 25
  Asteroid.MAXSPEED = 7

})(this);
