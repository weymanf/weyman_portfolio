Function.prototype.inherits = function(obj) {
  var Surrogate = function() {};
  Surrogate.prototype = obj.prototype;
  this.prototype = new Surrogate();
};

