(function($) {
  window.SquareCollection = Backbone.Collection.extend({
    model: window.SquareModel,

    initialize: function() {
      this.addEmptySquares();
      this.loadClips();
      this.bind("change reset", this.saveClips, this);
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

    loadClips: function() {
      var me = this;
      var clips = this.retrieveFromStore();
      this.placeInCollection(clips);
    },

    retrieveFromStore: function() {
      return JSON.parse($.cookie('savedClips'));
    },

    placeInCollection: function(clips) {
      var me = this;
      for(var key in clips) {
        if(clips[key]) {
          // Have to parseInt on the key since hash keys must be string
          me.findWhere({squareNumber: parseInt(key)}).set({'trackNumber': clips[key]});
        }
      }
    },

    saveClips: function() {
      var clips = this.formatClips();
      this.placeInStore(clips);
    },

    formatClips: function() {
      var clips = [];
      _.each(this.models, function(model) {
        clips[model.get('squareNumber')] = model.get('trackNumber');
      });
      return JSON.stringify(clips);
    },

    placeInStore: function(clips) {
      $.cookie('savedClips', clips, { expires: 30 });
    }
  });
})(jQuery);
