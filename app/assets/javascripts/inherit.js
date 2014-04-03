Function.prototype.inherits = function(obj) {
  var Surrogate = function() {};
  Surrogate.prototype = obj.prototype;
  this.prototype = new Surrogate();
}


// function Dog () {};
// Dog.prototype.bark = function () { console.log("Bark!"); };
//
// function Corgi () {};
// Corgi.inherits(Dog);
//
// new Corgi().bark();