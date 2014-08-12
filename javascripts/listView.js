(function($){
  window.ListView = Backbone.View.extend({
    el: $('body'),

    initialize: function(){
      var me = this;
      _.bindAll(this, 'render');

      this.setupMidiInputEvent();

      this.collection = new window.ListCollection();

      this.render();

      // this is after this.render() because #launchpad doesn't exist yet. Change this...
      $("#launchpad").addClass(".col-md-4");
      $("#launchpad").on("updateTrackNumber", function(event, squareNumber, trackNumber) {
        var square = _.find(me.collection.models, function(element) {
          return element.get('squareNumber') === squareNumber;
        });
        square.set('trackNumber', trackNumber);
      });
    },

    // This should be moved to libInitialisation.js
    setupMidiInputEvent : function() {
      var me = this;

      /*
      window.LibraryInitialiser.Jazz.MidiInOpen(0,function(t,a){
        if(a[2] === 0) {
          return; // Ignore the off signal
        }

        var square = _.find(me.collection.models, function(element) {
          return element.attributes.squareNumber == a[1];
        });
        square.play();
      });
      */
    },

    render: function(){
      var me = this;

      var template = _.template($("#index_template").html());
      this.$el.append(template);

      var squareCount = 1;
      _(this.collection.models).each(function(square){
        var squareView = new window.SquareView({
          model: square
        });
        $("#launchpad").append(squareView.render().el);

        if(squareCount % 8 === 0) {
          $("#launchpad").append("<br/>");
        }
        squareCount++;
      }, this);

      var trackDetailsView = new window.TrackDetailsView({
        model: new window.TrackDetailsModel()
      });
      $("#listView").append(trackDetailsView.render());
    }
  });
})(jQuery);
