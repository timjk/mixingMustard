(function($){
  window.LibraryInitialiser = Backbone.Model.extend({

    initialize: function() {
      Jazz = document.getElementById("Jazz1"); if(!Jazz || !Jazz.isJazz) Jazz = document.getElementById("Jazz2");
      // Jazz.MidiOutOpen('Launchpad');
      // Jazz.MidiOut(176,0,0); // Reset the launchpad

      SC.initialize({
        client_id: "6603d805dad113c51b7df28b6737f2cc",
        redirect_uri: "http://example.com/callback.html",
      });
    },

  });
})(jQuery);
