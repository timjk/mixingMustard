(function($) {
  window.TrackDetailsModel = Backbone.Model.extend({
    NO_TRACK: 'No Track Set.',
    NO_ARTIST: 'No Artist Set.',

    defaults: {
      squareNumber: -1,
      trackName: '',
      artistName: '',
      albumArt: './img/default.png'
    },

    initialize: function() {
      // Can't do this in defaults for some reason
      // http://stackoverflow.com/questions/25324196/setting-default-as-local-variable-in-model-results-in-undefined
      this.set('trackName', this.NO_TRACK);
      this.set('artistName', this.NO_ARTIST);
    },

    setModelData: function(squareNumber, trackNumber, view) {
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
        view.render();
      });
    },

    setInvalid: function(squareNumber, view) {
      this.set('squareNumber', squareNumber);
      this.set('trackName', this.NO_TRACK);
      this.set('artistName', this.NO_ARTIST);
      this.set('albumArt', './img/default.png');
      view.render();
    },
  });
})(jQuery);
