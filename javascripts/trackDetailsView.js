(function($){
  window.TrackDetailsView = Backbone.View.extend({
    className: $('#trackDetails'),

    initialize: function() {
      var me = this;
      $('#trackDetails').append('<div id = trackDetailsInfo></div>');
      $('#trackDetails').append('<button id = "changeTrackButton">Change Track</button>');
      $('#trackDetails').addClass('.col-md-8');

      $('#trackDetails').on('selectedChanged', function(event, trackNumber, squareNumber) {
        var clientId = '6603d805dad113c51b7df28b6737f2cc';

        me.model.set('squareNumber', squareNumber);

        if (trackNumber == -1) {
          me.model.set('trackSet', false);
          me.model.set('albumArt', './img/default.png');
          me.render();
          return;
        }

        $.getJSON( "http://api.soundcloud.com/tracks/" + trackNumber + ".json?client_id=" + clientId, function( data ) {
          me.model.set('trackSet', true);
          me.model.set('trackName', data.title);
          me.model.set('artistName', data.user.username);
          if (data.artwork_url) {
            me.model.set('albumArt', data.artwork_url);
          } else {
            me.model.set('albumArt', data.user.avatar_url);
          }
          me.render();
        });
      });

    $("#changeTrackButton").on("click", function() {
      var newTrackNumber = prompt("What would you like to change it to?");
      $("#launchpad").trigger("updateTrackNumber", [me.model.get('squareNumber'), newTrackNumber]);
    });

    },

    render: function() {
      /* why doesn't this work...?
       $(this.el).append('<p>' + this.model.get('trackName') + '</p>');
       // or
       this.$el.append('<p>' + this.model.get('trackName') + '</p>');
      */

      var squareNumberLine = '<p>Square: ' + this.model.get('squareNumber') + '</p>';
      var trackNameLine;
      var artistNameLine;
      var albumArtLine;

      if(this.model.get('trackSet') === false) {
        trackNameLine = '<p>No Track Set.</p>';
        artistNameLine = '<p>No Track Set.</p>';
        albumArtLine = '<img src=' + this.model.get('albumArt') + '/>';
      } else {
        trackNameLine = '<p>' + this.model.get('trackName') + '</p>';
        artistNameLine = '<p>' + this.model.get('artistName') + '</p>';
        albumArtLine = '<img src =' + this.model.get('albumArt') + '/>';
      }

      var html = squareNumberLine + trackNameLine + artistNameLine + albumArtLine;

      $('#trackDetailsInfo').html(html);
      return this;
    }
  });
})(jQuery);
