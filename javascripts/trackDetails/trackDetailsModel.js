(function($) {
  window.TrackDetailsModel = Backbone.Model.extend({
    NO_TRACK: 'No Track Set.',
    NO_ARTIST: 'No Artist Set.',

    defaults: {
      squareNumber: -1,
      trackName: '',
      artistName: '',
      albumArt: './img/default.png',
      trackLength: 100
    },

    initialize: function() {
      this.set('trackName', this.NO_TRACK);
      this.set('artistName', this.NO_ARTIST);
    },

    setModelData: function(squareNumber, trackNumber) {
      var me = this;
      this.set('squareNumber', squareNumber);

      $.getJSON('http://api.soundcloud.com/tracks/' + trackNumber + '.json?client_id=' + window.CLIENT_ID,
        function(trackInfo) {
        me.set('trackName', trackInfo.title);
        me.set('artistName', trackInfo.user.username);
        if (trackInfo.artwork_url) {
          me.set('albumArt', trackInfo.artwork_url);
        } else {
          me.set('albumArt', trackInfo.user.avatar_url);
        }
        me.set('trackLength', trackInfo.duration);
      });
    },

    setInvalid: function(squareNumber) {
      this.set('squareNumber', squareNumber);
      this.set('trackName', this.NO_TRACK);
      this.set('artistName', this.NO_ARTIST);
      this.set('albumArt', './img/default.png');
      this.set('trackLength', 100);
    },
  });
})(jQuery);
