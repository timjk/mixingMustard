(function($){
  window.TrackDetailsView = Backbone.View.extend({
    className: $('#trackDetails'),

    initialize: function() {
      var me = this;
      $("#trackDetails").on("selectedChanged", function(event, trackNumber) {

        var clientId = '6603d805dad113c51b7df28b6737f2cc';

        $.getJSON( "http://api.soundcloud.com/tracks/" + trackNumber + ".json?client_id=" + clientId, function( data ) {
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

    },

    render: function() {
      /* why doesn't this work...?
       $(this.el).append('<p>' + this.model.get('trackName') + '</p>');
       // or
       this.$el.append('<p>' + this.model.get('trackName') + '</p>');
      */

      var trackNameLine = '<p>' + this.model.get('trackName') + '</p>';
      var artistNameLine = '<p>' + this.model.get('artistName') + '</p>';
      var albumArtLine = '<img src =' + this.model.get('albumArt') + '/>';

      var html = trackNameLine + artistNameLine + albumArtLine;

      $('#trackDetails').html(html);
      return this;
    }
  });
})(jQuery);
