(function($) {
  window.SquareModel = Backbone.Model.extend({
    defaults: {
      squareNumber: 0,
      trackNumber: -1,
      position: 0,
      durationLength: 1000,
      playing: false,
      cachedSound: null,
    },

    initialize: function() {
      this.setCachedSong();
      this.on('change:trackNumber', this.setCachedSong, this);
      this.currentTimeout = '';
    },

    setCachedSong: function() {
      var me = this;
      var track = this.get('trackNumber');
      SC.stream(track, function(sound) {
        me.set('cachedSound', sound);
      });
    },

    execute: function() {
      var me = this;
      if (this.get('trackNumber') !== -1) {
        if (this.get('cachedSound')) {
          this.set('playing', true);
          this.get('cachedSound').stop();
          this.get('cachedSound').setPosition(this.get('position'));
          this.get('cachedSound').play();
          window.clearTimeout(this.currentTimeout);
          this.currentTimeout = setTimeout(_.bind(this.stop, this), this.get('durationLength'));
        } else {
          console.warn('Tried to play a track on square ' + this.squareNumber + " that hasn't cached yet");
        }
      } else {
        $('#launchpad').trigger('stopPressed', [this.get('squareNumber')]);
      }
    },

    stop: function() {
      this.get('cachedSound').stop();
      this.set('playing', false);
    },

    decideImageToUse: function() {
      var trackNumber = this.get('trackNumber');
      var buttonImage = trackNumber != -1 ? './img/button-active.png' : './img/button-passive.png';
      if (this.get('playing') && trackNumber != -1) {
        buttonImage = './img/button-playing.png';
      }
      return buttonImage;
    },
  });
})(jQuery);
