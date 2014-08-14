(function($){
  window.TrackDetailsView = Backbone.View.extend({
    id: 'trackDetails',
    className: 'col-md-6',
    events : {
      'click #changeTrackButton' : 'buttonClicked'
    },

    initialize: function() {
      var me = this;

      this.model = new window.TrackDetailsModel();

      $(this.el).on('selectedChanged', function(event, trackNumber, squareNumber) {
        var clientId = '6603d805dad113c51b7df28b6737f2cc';

        me.model.set('squareNumber', squareNumber);

        if (trackNumber == -1) {
          me.model.set('trackSet', false);
          me.model.set('albumArt', './img/default.png');
          me.render();
          return;
        }

        $.getJSON( 'http://api.soundcloud.com/tracks/' + trackNumber + '.json?client_id=' + clientId, function( data ) {
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

      this.render();
    },

    buttonClicked: function() {
      var newTrackNumber = prompt('What would you like to change it to?');
      $('#launchpad').trigger('updateTrackNumber', [this.model.get('squareNumber'), newTrackNumber]);
    },

    render: function() {
      var trackName = this.model.get('trackSet') ? this.model.get('trackName') : 'No Track Set.';
      var artistName = this.model.get('trackSet') ? this.model.get('artistName') : 'No Artist Set.';

      var trackNameLine = '<p>' + trackName + '</p>';
      var artistNameLine = '<p>' + artistName + '</p>';
      var albumArtLine = '<img class = "albumArt" src=' + this.model.get('albumArt') + '/>';

      var button = '<button id = "changeTrackButton">Change Track</button>';

      var html = albumArtLine + '<div>' + trackNameLine + artistNameLine + button + '</div>';

      $(this.el).html(html);
      return this;
    }
  });
})(jQuery);
