(function($) {
  window.TrackDetailsView = Backbone.View.extend({
    id: 'trackDetails',
    className: 'col-md-6',

    events: {
      'click #changeTrackButton': 'buttonClicked'
    },

    template: _.template('<img style = "width: 100px; height: 100px;" class = "albumArt" src = "<%= albumArt %>"/>' +
                          '<div>' +
                            '<div class = "trackDetailsInfo"><p><%= trackName %></p></div>' +
                            '<div class = "trackDetailsInfo"><p><%= artistName %></p></div>' +
                          '</div>' +
                          '<button id = "changeTrackButton">Change Track</button>'),

    initialize: function() {
      var me = this;

      this.model = new window.TrackDetailsModel();

      this.model.on("change:trackName", this.changedTrackName, this);
      this.model.on("change:artistName", this.changedArtist, this);
      this.model.on("change:albumArt", this.changedAlbumArt, this);

      this.$el.on('selectedChanged', function(event, trackNumber, squareNumber) {
        if (trackNumber == -1) {
          me.model.setInvalid(squareNumber);
        } else {
          me.model.setModelData(squareNumber, trackNumber);
        }
      });
    },

    render: function() {
      var trackName = this.model.get('trackName');
      var artistName = this.model.get('artistName');
      var albumArt = this.model.get('albumArt');

      var templateMappings = {'trackName' : trackName, 'artistName' : artistName, 'albumArt' : albumArt};
      this.$el.html(this.template(templateMappings));
      return this;
    },

    buttonClicked: function() {
      var newTrackNumber = prompt('What would you like to change it to?');
      $('#launchpad').trigger('updateTrackNumber', [this.model.get('squareNumber'), newTrackNumber]);
    },

    changedTrackName: function() {
      $('p', this.$el)[0].innerHTML = this.model.get('trackName');
    },

    changedArtistName: function() {
      $('p', this.$el)[1].innerHTML = this.model.get('artistName');
    },

    changedAlbumArt: function() {
      $('img', this.$el)[0].src = this.model.get('albumArt');
    },
  });
})(jQuery);
