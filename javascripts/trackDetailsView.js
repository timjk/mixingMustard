(function($){
  window.TrackDetailsView = Backbone.View.extend({
    id: 'trackDetails',
    className: 'col-md-6',

    events : {
      'click #changeTrackButton' : 'buttonClicked'
    },

    template : _.template('<img class = "albumArt" src="<%= albumArt %>"/>' +
                          '<div>' +
                            '<div class = "trackDetailsInfo"><p><%= trackName %></p></div>' +
                            '<div class = "trackDetailsInfo"><p><%= artistName %></p></div>' +
                          '</div>' +
                          '<button id = "changeTrackButton">Change Track</button>'),

    initialize: function() {
      var me = this;

      this.model = new window.TrackDetailsModel();

      this.$el.on('selectedChanged', function(event, trackNumber, squareNumber) {
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
    },

    buttonClicked: function() {
      var newTrackNumber = prompt('What would you like to change it to?');
      $('#launchpad').trigger('updateTrackNumber', [this.model.get('squareNumber'), newTrackNumber]);
    },

    render: function() {
      var trackName = this.model.get('trackSet') ? this.model.get('trackName') : 'No Track Set.';
      var artistName = this.model.get('trackSet') ? this.model.get('artistName') : 'No Artist Set.';
      var albumArt = this.model.get('albumArt');

      var templateMappings = {'trackName' : trackName, 'artistName' : artistName, 'albumArt' : albumArt};
      this.$el.html(this.template(templateMappings));
      return this;
    }
  });
})(jQuery);
