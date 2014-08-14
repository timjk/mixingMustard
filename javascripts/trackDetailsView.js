(function($){
  window.TrackDetailsView = Backbone.View.extend({
    id: 'trackDetails',
    className: 'col-md-6',

    events: {
      'click #changeTrackButton': 'buttonClicked'
    },

    template: _.template('<img class = "albumArt" src = "<%= albumArt %>"/>' +
                          '<div>' +
                            '<div class = "trackDetailsInfo"><p><%= trackName %></p></div>' +
                            '<div class = "trackDetailsInfo"><p><%= artistName %></p></div>' +
                          '</div>' +
                          '<button id = "changeTrackButton">Change Track</button>'),

    initialize: function() {
      var me = this;

      this.model = new window.TrackDetailsModel();

      this.$el.on('selectedChanged', function(event, trackNumber, squareNumber) {
        if (trackNumber == -1) {
          me.model.setInvalid(squareNumber, me);
        } else {
          me.model.setModelData(squareNumber, trackNumber, me);
        }
        me.render();
      });
    },

    buttonClicked: function() {
      var newTrackNumber = prompt('What would you like to change it to?');
      $('#launchpad').trigger('updateTrackNumber', [this.model.get('squareNumber'), newTrackNumber]);
    },

    render: function() {
      var trackName = this.model.isValid() ? this.model.get('trackName') : 'No Track Set.';
      var artistName = this.model.isValid() ? this.model.get('artistName') : 'No Artist Set.';
      var albumArt = this.model.get('albumArt');

      var templateMappings = {'trackName' : trackName, 'artistName' : artistName, 'albumArt' : albumArt};
      this.$el.html(this.template(templateMappings));
      return this;
    }
  });
})(jQuery);
