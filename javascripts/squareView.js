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

      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      var squareNumber = this.model.get('squareNumber');
      var trackNumber = this.model.get('trackNumber');
      var buttonImage = this.model.decideImageToUse();

      if (trackNumber != -1) {
        /*
        if(this.model.get('playing')) {
          Jazz.MidiOut(0x90, squareNumber, this.LAUNCHPAD_AMBER);
        } else {
          Jazz.MidiOut(0x90, squareNumber, this.LAUNCHPAD_GREEN);
        }
        */
      }

      this.$el.html('<img class = "square" src = "' + buttonImage + '"/>');
      return this;
    },

    squareClicked: function() {
      $('.square').removeClass('selectedSquare');
      $('#trackDetails').trigger('selectedChanged', [this.model.get('trackNumber'), this.model.get('squareNumber')]);
      if (this.model.get('trackNumber') != -1) {
        this.model.play();
      }
      $('.square', this.$el).addClass('selectedSquare');
    }
  });
})(jQuery);
