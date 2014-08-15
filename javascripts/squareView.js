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
      // this.lightLaunchpad();
      return this;
    },

    lightLaunchpad: function() {
      var squareNumber = this.model.get('squareNumber');
      var trackNumber = this.model.get('trackNumber');

      if (trackNumber != -1) {
        /*
        if(this.model.get('playing')) {
          Jazz.MidiOut(0x90, squareNumber, this.LAUNCHPAD_AMBER);
        } else {
          Jazz.MidiOut(0x90, squareNumber, this.LAUNCHPAD_GREEN);
        }
        */
      }
    },

    squareClicked: function() {
      $('.square').removeClass('selectedSquare');

      if (this.model.get('trackNumber') != -1) {
        this.model.play();
      }

      $('.square', this.$el).addClass('selectedSquare');
      $('#trackDetails').trigger('selectedChanged', [this.model.get('trackNumber'), this.model.get('squareNumber')]);
    },

    changeImageIfNecessary: function() {
      $('img', this.$el)[0].src = this.model.decideImageToUse();
    },
  });
})(jQuery);
