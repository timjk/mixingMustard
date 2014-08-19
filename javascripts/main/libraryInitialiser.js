(function($) {
  window.LibraryInitialiser = Backbone.Model.extend({

    initialize: function() {
      this.setupSoundcloud();
      this.setupWebMidi();
    },

    setupSoundcloud: function() {
      window.CLIENT_ID = '6603d805dad113c51b7df28b6737f2cc';

      SC.initialize({
        client_id: window.CLIENT_ID,
        redirect_uri: 'http://example.com/callback.html',
      });
    },

    setupWebMidi: function() {
      navigator.requestMIDIAccess().then(this.onMidiSuccess, this.onMidiFailure, this);
    },

    onMidiSuccess: function(midiAccess) {
      window.Midi = midiAccess;
      window.Midi.outputs()[0].send([176, 0, 0]); // reset launchpad
      this.secondStage();
      // is the device always 0?
      window.Midi.inputs()[0].onmidimessage = function(event) {
        $('#launchpad').trigger('midiInput', event.data[1]);
      };
    },

    onMidiFailure: function(msg) {
      console.log("Failed to get MIDI access - " + msg );
    },

    onMidiMessage: function(event) {
      $('#launchpad').trigger('midiInput', event.data[1]);
    },

    sendMidiSignal: function(message) {
      window.Midi.outputs()[0].send(message);
    }
  });
})(jQuery);
