(function (root) {

  var randColor = function() {
    var colorHex = Math.floor( Math.random() * 0xFFFFFF );
    return ("#" + colorHex.toString(16));
  }

  var SG = root.SG = (root.SG || {});

  var View = SG.View = function ($el) {
    this.$el = $el;

    this.board = null;
    this.intervalId = null;
  }

  View.KEYS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.STEP_MILLIS = 85;

  View.prototype.handleKeyEvent = function (event) {
    if(key.isPressed("s"))
      this.board.snake.turn("S");
    if(key.isPressed("w"))
      this.board.snake.turn("N");
    if(key.isPressed("a"))
      this.board.snake.turn("W");
    if(key.isPressed("d"))
      this.board.snake.turn("E");
    if (_(View.KEYS).has(event.keyCode)) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    } else {
      // some other key was pressed; ignore.
    }
  };

  View.prototype.render = function () {
    // simple text based rendering
    // this.$el.html(this.board.render());

    var view = this;
    var board = view.board;

    function buildCellsMatrix () {
      return _.times(board.dim, function () {
        return _.times(board.dim, function () {
          return $('<div class="cell"></div>');
        });
      });
    }

    var cellsMatrix = buildCellsMatrix();
    _(board.snake.segments).each(function (seg) {
      cellsMatrix[seg.i][seg.j].addClass("snake");
    });

    cellsMatrix[board.apple.position.i][board.apple.position.j].addClass("apple");

    this.$el.empty();
    _(cellsMatrix).each(function (row) {
      var $rowEl = $('<div class="row"></div>');
      _(row).each(function ($cell) { $rowEl.append($cell) });
      view.$el.append($rowEl);
    });
  };

  View.prototype.step = function () {
    if (_(this.board.snake.segments).last()) {
      this.board.snake.move();
      if (this.board.snake.grow === true) {
        View.STEP_MILLIS -= 10;
        console.log(View.STEP_MILLIS)
        window.clearInterval(this.intervalId); 
        this.intervalId = window.setInterval(
           this.step.bind(this), View.STEP_MILLIS
           );
      }
      this.render();
    } else {
      $('#grid').append("<h1>You Loseee!!</h1>")
      window.clearInterval(this.intervalId);
    }
    $(".snake").css({"background-color": randColor()})
  };

  $(".restart-sn").click(function(){
    window.clearInterval(this.intervalId); 
  });

  View.prototype.start = function () {
    this.board = new SG.Board(20);

    $(window).keydown(this.handleKeyEvent.bind(this));

    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.STEP_MILLIS
      );
  };
})(this);
