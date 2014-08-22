(function($) {
  window.TrackDetailsView = Backbone.View.extend({
    id: 'trackDetails',
    className: 'col-md-6',

    events: {
      'click #changeTrackButton': 'changeTrackClicked',
      'click #changePositionButton': 'changePositionClicked'
    },

    template: _.template('<img style = "width: 100px; height: 100px;" class = "albumArt" src = "<%= albumArt %>"/>' +
                          '<div>' +
                            '<div class = "trackDetailsInfo"><p><%= trackName %></p></div>' +
                            '<div class = "trackDetailsInfo"><p><%= artistName %></p></div>' +
                          '</div>' +
                          '<button id = "changeTrackButton">Change Track</button>' +
                          '<div id = "trackPositionSlider"></div>'),

    initialize: function() {
      var me = this;

      this.model = new window.TrackDetailsModel();

      this.model.on('change:trackName', this.changedTrackName, this);
      this.model.on('change:artistName', this.changedArtistName, this);
      this.model.on('change:albumArt', this.changedAlbumArt, this);
      this.model.on('change:trackLength', this.changedTrackLength, this);

      this.$el.on('selectedChanged', function(event, trackNumber, squareNumber, trackPosition) {
        if (trackNumber == -1) {
          me.model.setInvalid(squareNumber);
        } else {
          me.model.setModelData(squareNumber, trackNumber, trackPosition);
        }
      });

    },

    render: function() {
      var trackName = this.model.get('trackName');
      var artistName = this.model.get('artistName');
      var albumArt = this.model.get('albumArt');

      var templateMappings = {'trackName' : trackName, 'artistName' : artistName, 'albumArt' : albumArt};
      this.$el.html(this.template(templateMappings));

      $('#trackPositionSlider', this.$el).slider();
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

    changePositionClicked: function() {
      var sliderPosition = $('#trackPositionSlider').slider('option', "value");
      $('#launchpad').trigger('updatePosition', [this.model.get('squareNumber'), sliderPosition]);
    },

    changedTrackName: function() {
      $('p', this.$el)[0].innerHTML = this.model.get('trackName').substring(0, 40);
    },

    changedArtistName: function() {
      $('p', this.$el)[1].innerHTML = this.model.get('artistName').substring(0, 40);
    },

    changedAlbumArt: function() {
      $('img', this.$el)[0].src = this.model.get('albumArt');
    },

    changedTrackLength: function() {
      var me = this;
      $('#trackPositionSlider', this.$el).slider('option', 'max', this.model.get('trackLength'));
      $('#trackPositionSlider', this.$el).slider('value', this.model.get('trackPosition'));
      $('#trackPositionSlider').on('slidechange', function(event, ui) { me.changePositionClicked(); });
    },
  });
})(jQuery);
