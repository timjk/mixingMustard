(function($){
  window.SquareModel = Backbone.Model.extend({
    defaults : {
      squareNumber: 0,
      trackNumber: -1,
      position: 0,
      playing: false,
      cachedSound: null,
    },

    initialize: function() {
      this.setCachedSong();
      this.on('change:trackNumber', this.setCachedSong, this);
    },

    setCachedSong: function() {
      var me = this;
      var track = this.get('trackNumber');
      SC.stream(track, function(sound){
        me.set('cachedSound', sound);
      });
    },

    play: function() {
      this.set('playing', true);
      this.get('cachedSound').stop();
      // position doesn't work yet
      // this.get('cachedSound').setPosition(this.get('position'));
      this.get('cachedSound').play();
    }
  });
})(jQuery);
