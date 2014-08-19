(function($) {
  window.SquareView = Backbone.View.extend({
    className: 'squareContainer',
    events: {
      'click': 'squareClicked'
    },

    initialize: function() {
      this.LAUNCHPAD_RED = 15;
      this.LAUNCHPAD_AMBER = 63;
      this.LAUNCHPAD_GREEN = 60;

      this.model.on("change:trackNumber", this.changeImageIfNecessary, this);
      this.model.on("change:playing", this.changeImageIfNecessary, this);
    },

    render: function() {
      this.$el.html('<img class = "square" src = "' + this.model.decideImageToUse() + '"/>');
      this.lightLaunchpad();
      return this;
    },

    lightLaunchpad: function() {
      var squareNumber = this.model.get('squareNumber');
      var trackNumber = this.model.get('trackNumber');

      if (trackNumber != -1) {
        var message;
        if (this.model.get('playing')) {
          message = [0x90, squareNumber, this.LAUNCHPAD_GREEN];
        } else {
          message = [0x90, squareNumber, this.LAUNCHPAD_AMBER];
        }

        window.libraryInitialiser.sendMidiSignal(message);
      }
    },

    squareClicked: function() {
      $('.square').removeClass('selectedSquare');

      this.model.execute();

      $('.square', this.$el).addClass('selectedSquare');
      $('#trackDetails').trigger('selectedChanged', [this.model.get('trackNumber'), this.model.get('squareNumber')]);
    },

    changeImageIfNecessary: function() {
      $('img', this.$el)[0].src = this.model.decideImageToUse();
      this.lightLaunchpad();
    },
  });
})(jQuery);
