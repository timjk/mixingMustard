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
        var square = _.find(me.squareCollection.models, function(element) {
          return element.get('squareNumber') === squareNumber;
        });
        square.set('trackNumber', trackNumber);
      });

      this.$el.on('updateTrackPlayLength', function(event, squareNumber, trackPlayLength) {
        var square = _.find(me.squareCollection.models, function(element) {
          return element.get('squareNumber') === squareNumber;
        });
        square.set('trackPlayLength', trackPlayLength);
      });

      this.$el.on('updatePosition', function(event, squareNumber, position) {
        var square = _.find(me.squareCollection.models, function(element) {
          return element.get('squareNumber') === squareNumber;
        });
        square.set('position', position);
      });

      this.$el.on('stopPressed', function(event, squareNumber) {
        _.each(me.squareViewList, function(squareView) {
          squareView.model.stop();
        });
      });

      this.$el.on('midiInput', function(event, squareNumber) {
        var squareModel = _.find(me.squareCollection.models, function(square) {
          return square.get('squareNumber') === squareNumber;
        });

        squareModel.execute();
      });
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
