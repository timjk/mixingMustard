(function($){
  window.ListCollection = Backbone.Collection.extend({
    model: window.SquareModel,

    initialize: function() {
      this.addEmptySquares();
      this.setDefaultClips();
    },

    addEmptySquares: function() {
      var me = this;

      var squareNumbers = [];
      squareNumbers = squareNumbers.concat(_.range(0, 8));
      squareNumbers = squareNumbers.concat(_.range(16, 24));
      squareNumbers = squareNumbers.concat(_.range(32, 40));
      squareNumbers = squareNumbers.concat(_.range(48, 56));
      squareNumbers = squareNumbers.concat(_.range(64, 72));
      squareNumbers = squareNumbers.concat(_.range(80, 88));
      squareNumbers = squareNumbers.concat(_.range(96, 104));
      squareNumbers = squareNumbers.concat(_.range(112, 120));

      _.each(squareNumbers, function(squareNumber) {
        me.addSquare(squareNumber, -1, 0);
      });
    },

    addSquare: function(squareNumber, trackNumber, position) {
      var square = new window.SquareModel({
        squareNumber: squareNumber,
        trackNumber: trackNumber,
        position: position
      });
      this.add(square);
    },

    setDefaultClips: function() {
      this.findWhere({squareNumber : 0}).set({"trackNumber" : 139133862});
      this.findWhere({squareNumber : 1}).set({"trackNumber" : 153158256});
      this.findWhere({squareNumber : 2}).set({"trackNumber" : 65732315});
    }
  });
})(jQuery);
