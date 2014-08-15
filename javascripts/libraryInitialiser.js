(function($) {
  window.LibraryInitialiser = Backbone.Model.extend({

    initialize: function() {
      this.setupWebMidi();

      window.CLIENT_ID = '6603d805dad113c51b7df28b6737f2cc';

      SC.initialize({
        client_id: window.CLIENT_ID,
        redirect_uri: 'http://example.com/callback.html',
      });
    },

    setupWebMidi : function() {
      function onMIDISuccess(midiAccess) {
        window.Midi = midiAccess;
        // is it always 0?
        window.Midi.inputs()[0].onmidimessage = onMIDIMessage;
      }

      function onMIDIFailure(msg) {
        console.log("Failed to get MIDI access - " + msg );
      }

      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

      function onMIDIMessage(event) {
        $('#launchpad').trigger('midiInput', event.data[1]);
      }
    },
  });
})(jQuery);
