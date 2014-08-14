(function($) {
  window.LibraryInitialiser = Backbone.Model.extend({

    initialize: function() {
      Jazz = document.getElementById('Jazz1'); if(!Jazz || !Jazz.isJazz) Jazz = document.getElementById('Jazz2');
      // Jazz.MidiOutOpen('Launchpad');
      // Jazz.MidiOut(176,0,0); // Reset the launchpad

      window.CLIENT_ID = '6603d805dad113c51b7df28b6737f2cc';

      SC.initialize({
        client_id: window.CLIENT_ID,
        redirect_uri: 'http://example.com/callback.html',
      });
    },

    setupMidiInputEvent : function() {
      var me = this;

      /*
      Jazz.MidiInOpen(0,function(t,a){
        if(a[2] === 0) {
          return; // Ignore the off signal
        }

        // broadcast event...
        var square = _.find(me.collection.models, function(element) {
          return element.attributes.squareNumber == a[1];
        });
        square.play();
      });
      */
    },
  });
})(jQuery);
