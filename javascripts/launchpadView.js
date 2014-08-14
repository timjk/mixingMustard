(function($){
  window.LaunchpadView = Backbone.View.extend({
    id: 'launchpad',
    className: 'col-md-6',

    initialize: function() {
      var me = this;
      this.squareCollection = new window.SquareCollection();

      this.$el.on('updateTrackNumber', function(event, squareNumber, trackNumber) {
        var square = _.find(me.squareCollection.models, function(element) {
          return element.get('squareNumber') === squareNumber;
        });
        square.set('trackNumber', trackNumber);
      });
    },

    render: function() {
      var squareCount = 1;
      _(this.squareCollection.models).each(function(square){
        var squareView = new window.SquareView({
          model: square
        });
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
