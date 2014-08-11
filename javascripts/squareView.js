(function($){
  window.SquareView = Backbone.View.extend({
    className: 'squareContainer',
    events : {
      "click" : "squareClicked"
    },

    initialize: function() {
      this.LAUNCHPAD_RED = 15;
      this.LAUNCHPAD_AMBER = 63;
      this.LAUNCHPAD_GREEN = 60;

      this.listenTo(this.model, "change", this.render);
    },

    render: function() {
      var squareNumber = this.model.get('squareNumber');
      var trackNumber = this.model.get('trackNumber');
      var buttonImage = this.decideImageToUse();

      if (trackNumber != -1) {
        /*
        if(this.model.get('playing')) {
          window.LibraryInitialiser.Jazz.MidiOut(0x90, squareNumber, this.LAUNCHPAD_AMBER);
        } else {
          window.LibraryInitialiser.Jazz.MidiOut(0x90, squareNumber, this.LAUNCHPAD_GREEN);
        }
        */
      }

      $(this.el).html('<img class="square" src="' + buttonImage + '"/>');
      return this;
    },

    decideImageToUse: function() {
      var trackNumber = this.model.get('trackNumber');
      var buttonImage = trackNumber != -1 ? './img/button-active.png' : './img/button-passive.png';
      if (this.model.get('playing')) {
        buttonImage = './img/button-playing.png';
      }
      return buttonImage;
    },

    squareClicked: function() {
      if (this.model.get('trackNumber') != -1) {
        $('#trackDetails').trigger('selectedChanged', [this.model.get('trackNumber')]);
        this.model.play();
      }
    }
  });
})(jQuery);
