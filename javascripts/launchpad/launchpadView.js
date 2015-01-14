(function($) {
  window.LaunchpadView = Backbone.View.extend({
    id: 'launchpad',
    className: 'col-md-6',

    initialize: function() {
      var me = this;

      this.squareCollection = new window.SquareCollection();
      this.squareViewList = _.map(this.squareCollection.models, function(square) {
        return new window.SquareView({
          model: square
        });
      }, this);

      this.$el.on('updateTrackNumber', function(event, squareNumber, trackNumber) {
        var square = me.findSquare(squareNumber);
        square.set('trackNumber', trackNumber);
      });

      this.$el.on('updatePosition', function(event, squareNumber, position) {
        var square = me.findSquare(squareNumber);
        square.set('position', position);
      });

      this.$el.on('updateDurationLength', function(event, squareNumber, durationLength) {
        var square = me.findSquare(squareNumber);
        square.set('durationLength', durationLength);
      });

      this.$el.on('stopPressed', function(event, squareNumber) {
        _.each(me.squareViewList, function(squareView) {
          squareView.model.stop();
        });
      });

      this.$el.on('midiInput', function(event, squareNumber) {
        var square = me.findSquare(squareNumber);
        square.execute();
      });
    },

    findSquare: function(squareNumber) {
      var square = _.find(this.squareCollection.models, function(element) {
        return element.get('squareNumber') === squareNumber;
      });
      return square;
    },

    render: function() {
      var me = this;
      var squareCount = 1;
      _.each(this.squareViewList, function(squareView) {
        this.$el.append(squareView.render().$el);

        if(squareCount % 8 === 0) {
          this.$el.append('<br/>');
        }

        squareCount++;
      }, this);

      return this;
    },
  });
})(jQuery);
