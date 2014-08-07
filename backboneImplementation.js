(function($){

  var Square = Backbone.Model.extend({
    defaults : {
      squareNumber: 0,
      trackNumber: -1,
      position: 0,
      playing: false,
      cachedSound: null,
    },

    initialize: function() {
      var me = this;

      var track = this.get("trackNumber");

      SC.stream(track, function(sound){
        me.set("cachedSound", sound);
      });
    },

    arm: function() {
      this.set("playing", true);
      Jazz.MidiOut(0x90, this.get("squareNumber") ,15);

      this.get("cachedSound").stop();
      this.get("cachedSound").setPosition(this.get("position"));
      this.get("cachedSound").play();
    }
  });

  var SquareView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    },

    render: function() {
      var squareNumber = this.model.get('squareNumber');
      var trackNumber = this.model.get('trackNumber');
      var buttonImage = trackNumber != -1 ? './img/button-active.png' : './img/button-passive.png';
      if(this.model.get('playing')) {
        buttonImage = './img/button-armed.png';
      }

      if(trackNumber != -1) {
        Jazz.MidiOut(0x90, squareNumber, 32);
      }

      $(this.el).html('<img class="square" data-squarenumber=' + squareNumber + ' url="/tracks/' + trackNumber + '" position=0 src="' + buttonImage + '"/>');

      return this;
    }
  });

  var List = Backbone.Collection.extend({
    model: Square
  });

  var ListView = Backbone.View.extend({
    el: $('body'),

    initialize: function(){
      _.bindAll(this, 'render');

      this.initializeSoundcloudAndLaunchpad();
      this.setupMidiInputEvent();

      this.collection = new List();

      this.addSquare(0, 139133862, 0);
      this.addSquare(1, 153158256, 0);
      this.addSquare(2, 65732315, 5);
      this.addSquare(3, -1, 0);

      this.render();
    },

    addSquare: function(squareNumber, trackNumber, position) {
      var square = new Square({
        squareNumber: squareNumber,
        trackNumber: trackNumber,
        position: position
      });
      this.collection.add(square);
    },

    initializeSoundcloudAndLaunchpad : function() {
      Jazz = document.getElementById("Jazz1"); if(!Jazz || !Jazz.isJazz) Jazz = document.getElementById("Jazz2");
      Jazz.MidiOutOpen('Launchpad');
      Jazz.MidiOut(176,0,0); // Reset the launchpad

      SC.initialize({
        client_id: "6603d805dad113c51b7df28b6737f2cc",
        redirect_uri: "http://example.com/callback.html",
      });
    },

    setupMidiInputEvent : function() {
      var me = this;
      Jazz.MidiInOpen(0,function(t,a){
        if(a[2] === 0) {
          return; // Ignore the off signal
        }

        var square = _.find(me.collection.models, function(element) {
          return element.attributes.squareNumber == a[1];
        });
        square.arm();
      });
    },

    render: function(){
      var me = this;

      $(this.el).append("<h2>Launch Cloud</h2>");
      $(this.el).append("<h3>Use your Launchpad to cue soundcloud clips</h3>");

      _(this.collection.models).each(function(square){
        var squareView = new SquareView({
          model: square
        });
        $(this.el).append(squareView.render().el);
      }, this);
    }
  });

  var listView = new ListView();
})(jQuery);
