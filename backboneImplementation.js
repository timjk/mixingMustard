(function($){

  var Square = Backbone.Model.extend({
    defaults : {
      squareNumber: 0,
      trackNumber: -1,
      position: 0,
      playing: false
    },

    arm: function() {
      this.set("playing", true);
      Jazz.MidiOut(0x90, this.get("squareNumber") ,15);
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

      $(this.el).html('<img class="square" data-squarenumber=' + squareNumber + ' url="/tracks/' + trackNumber + '" position=0 src="' + buttonImage + '"/>');

      return this;
    }
  });

  var List = Backbone.Collection.extend({
    model: Square
  });

  var ListView = Backbone.View.extend({
    el: $('body'),

    events: {
      'click img': 'playClip'
    },

    initialize: function(){
      _.bindAll(this, 'render');

      this.preloadedClips = [];

      this.initializeSoundcloudAndLaunchpad();
      this.setupMidiInputEvent();

      this.collection = new List();

      var square = new Square();
      square.set({
        squareNumber: 0,
        trackNumber: 158851384
      });
      this.collection.add(square);

      this.addBlankSquare(1);
      this.addBlankSquare(2);
      this.addBlankSquare(3);

      this.render();
      this.preloadClips();
    },

    addBlankSquare: function(squareNumber) {
      var square = new Square();
      square.set({
        squareNumber: squareNumber,
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
    },

    preloadClips: function() {
      var me = this;
      var allSquares = $(".square");
      $.each(allSquares, function(i, square) {
        var squareNumber = $(square).data("squarenumber");
        var track = $(square).attr("url");
        SC.stream(track, function(sound){
          me.preloadedClips[squareNumber] = sound;
        });
      });
    },

    playClip: function(item) {
      this.playTrackOnSquare(item.target);
      this.markSquareAsArmed(item.target);
    },

    playTrackOnSquare: function(square) {
      var squareNumber = $(square).data("squarenumber");
      var position = $(square).attr("position");

      this.preloadedClips[squareNumber].stop();
      this.preloadedClips[squareNumber].setPosition(position);
      this.preloadedClips[squareNumber].play();
    }
  });

  var listView = new ListView();
})(jQuery);
