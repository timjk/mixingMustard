(function($) {
  window.TrackDetailsModel = Backbone.Model.extend({
    defaults: {
      squareNumber: -1,
      trackSet: false,
      trackName: '',
      artistName: '',
      albumArt: './img/default.png'
    },

    isValid: function() {
      return this.get('trackSet');
    },

    setModelData: function(squareNumber, trackNumber, view) {
      var me = this;
      this.set('squareNumber', squareNumber);

      $.getJSON('http://api.soundcloud.com/tracks/' + trackNumber + '.json?client_id = ' + window.CLIENT_ID, function(trackInfo) {
        me.set('trackSet', true);
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
      this.set('trackSet', false);
      this.set('albumArt', './img/default.png');
      view.render();
    },
  });
})(jQuery);
