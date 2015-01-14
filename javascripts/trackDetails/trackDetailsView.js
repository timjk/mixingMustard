(function($) {
  window.TrackDetailsView = Backbone.View.extend({
    id: 'trackDetails',
    className: 'col-md-6',

    events: {
      'click #changeTrackButton': 'changeTrackClicked',
      'click #startPositionButton': 'startPositionClicked',
      'click #durationButton': 'durationButtonClicked'
    },

    template: _.template('<img style = "width: 100px; height: 100px;" class = "albumArt" src = "<%= albumArt %>"/>' +
                          '<div>' +
                            '<div class = "trackDetailsInfo"><p><%= trackName %></p></div>' +
                            '<div class = "trackDetailsInfo"><p><%= artistName %></p></div>' +
                          '</div>' +
                          '<button id = "changeTrackButton">Change Track</button>' +
                          '<button id = "startPositionButton">Start Position</button>' +
                          '<button id = "durationButton">Duration</button>'),

    initialize: function() {
      var me = this;

      this.model = new window.TrackDetailsModel();

      this.model.on('change:trackName', this.changedTrackName, this);
      this.model.on('change:artistName', this.changedArtistName, this);
      this.model.on('change:albumArt', this.changedAlbumArt, this);

      this.$el.on('selectedChanged', function(event, trackNumber, squareNumber, trackPosition, trackDuration) {
        if (trackNumber == -1) {
          me.model.setInvalid(squareNumber);
        } else {
          me.model.setModelData(squareNumber, trackNumber, trackPosition, trackDuration);
        }
      });
    },

    render: function() {
      var me = this;
      var trackName = this.model.get('trackName');
      var artistName = this.model.get('artistName');
      var albumArt = this.model.get('albumArt');

      var templateMappings = {'trackName' : trackName, 'artistName' : artistName, 'albumArt' : albumArt};
      this.$el.html(this.template(templateMappings));

      return this;
    },

    changeTrackClicked: function() {
      var me = this;
      var trackUrl = prompt('Track Url:');
      if (!trackUrl) {
        return;
      }

      SC.get('/resolve', { url: trackUrl }, function(track) {
        $('#launchpad').trigger('updateTrackNumber', [me.model.get('squareNumber'), track.id]);
      });
    },

    startPositionClicked: function() {
      var startPosition = prompt('Start Position:');
      if (!startPosition) {
        return;
      }

      startPosition = startPosition * 1000;
      $('#launchpad').trigger('updatePosition', [this.model.get('squareNumber'), startPosition]);
    },

    durationButtonClicked: function() {
      var durationLength = prompt('Duration Length:');
      if (!durationLength) {
        return;
      }

      durationLength = durationLength * 1000;
      $('#launchpad').trigger('updateDurationLength', [this.model.get('squareNumber'), durationLength]);
    },

    changedTrackName: function() {
      $('.trackDetailsInfo p', this.$el)[0].innerHTML = this.model.get('trackName').substring(0, 40);
    },

    changedArtistName: function() {
      $('.trackDetailsInfo p', this.$el)[1].innerHTML = this.model.get('artistName').substring(0, 40);
    },

    changedAlbumArt: function() {
      $('.albumArt', this.$el)[0].src = this.model.get('albumArt');
    }
  });
})(jQuery);
