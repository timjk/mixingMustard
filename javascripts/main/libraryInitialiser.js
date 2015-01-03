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
      if(midiAccess.outputs[0]) {
        window.MidiDevice = midiAccess.outputs[0];
        window.MidiDevice.send([176, 0, 0]); // reset launchpad
      } else {
        console.warn("Couldn't find any midi devices");
      }
      this.secondStage();
      window.Midi.inputs()[0].onmidimessage = function(event) {
        console.debug(event.data);
        if (event.data[2] === 127) { // use on signal and ignore off
          $('#launchpad').trigger('midiInput', event.data[1]);
        }
      };
    },

    onMidiFailure: function(msg) {
      console.log("Failed to get MIDI access - " + msg );
    },

    onMidiMessage: function(event) {
      $('#launchpad').trigger('midiInput', event.data[1]);
    },

    sendMidiSignal: function(message) {
      if(window.MidiDevice) {
        window.MidiDevice.send(message);
      }
    }
  });
})(jQuery);
