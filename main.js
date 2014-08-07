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
      this.setCachedSong();
      this.on("change:trackNumber", this.setCachedSong, this);
    },

    setCachedSong: function() {
      var me = this;
      var track = this.get("trackNumber");
      SC.stream(track, function(sound){
        me.set("cachedSound", sound);
      });
    },

    play: function() {
      this.set("playing", true);
      this.get("cachedSound").stop();
      this.get("cachedSound").setPosition(this.get("position"));
      this.get("cachedSound").play();
    }
  });

  var SquareView = Backbone.View.extend({
    className: 'squareContainer',

    initialize: function() {
      this.LAUNCHPAD_RED = 15;
      this.LAUNCHPAD_AMBER = 63;
      this.LAUNCHPAD_GREEN = 60;

      this.listenTo(this.model, "change", this.render);
    },

    render: function() {
      var squareNumber = this.model.get('squareNumber');
      var trackNumber = this.model.get('trackNumber');
      var buttonImage = this.decideImageToUse();

      if(trackNumber != -1) {
        if(this.model.get('playing')) {
          Jazz.MidiOut(0x90, squareNumber, this.LAUNCHPAD_AMBER);
        } else {
          Jazz.MidiOut(0x90, squareNumber, this.LAUNCHPAD_GREEN);
        }
      }

      $(this.el).html('<img class="square" src="' + buttonImage + '"/>');

      return this;
    },

    decideImageToUse: function() {
      var trackNumber = this.model.get('trackNumber');
      var buttonImage = trackNumber != -1 ? './img/button-active.png' : './img/button-passive.png';
      if(this.model.get('playing')) {
        buttonImage = './img/button-playing.png';
      }
      return buttonImage;
    }
  });

  var List = Backbone.Collection.extend({
    model: Square,

    initialize: function() {
      this.addEmptySquares();
      this.setDefaultClips();
    },

    addEmptySquares: function() {
      var me = this;

      var squareNumbers = [];
      squareNumbers = squareNumbers.concat(_.range(0, 8));
      squareNumbers = squareNumbers.concat(_.range(16, 24));
      squareNumbers = squareNumbers.concat(_.range(32, 40));
      squareNumbers = squareNumbers.concat(_.range(48, 56));
      squareNumbers = squareNumbers.concat(_.range(64, 72));
      squareNumbers = squareNumbers.concat(_.range(80, 88));
      squareNumbers = squareNumbers.concat(_.range(96, 104));
      squareNumbers = squareNumbers.concat(_.range(112, 120));

      _.each(squareNumbers, function(squareNumber) {
        me.addSquare(squareNumber, -1, 0);
      });
    },

    addSquare: function(squareNumber, trackNumber, position) {
      var square = new Square({
        squareNumber: squareNumber,
        trackNumber: trackNumber,
        position: position
      });
      this.add(square);
    },

    setDefaultClips: function() {
      this.findWhere({squareNumber : 0}).set({"trackNumber" : 139133862});
      this.findWhere({squareNumber : 1}).set({"trackNumber" : 153158256});
      this.findWhere({squareNumber : 2}).set({"trackNumber" : 65732315});
    }
  });

  var ListView = Backbone.View.extend({
    el: $('body'),

    initialize: function(){
      _.bindAll(this, 'render');

      this.setupMidiInputEvent();

      this.collection = new List();
      this.render();
    },

    // This should be moved to libInitialisation.js
    setupMidiInputEvent : function() {
      var me = this;
      Jazz.MidiInOpen(0,function(t,a){
        if(a[2] === 0) {
          return; // Ignore the off signal
        }

        var square = _.find(me.collection.models, function(element) {
          return element.attributes.squareNumber == a[1];
        });
        square.play();
      });
    },

    render: function(){
      var me = this;

      var template = _.template($("#index_template").html());
      this.$el.append(template);

      var squareCount = 1;
      _(this.collection.models).each(function(square){
        var squareView = new SquareView({
          model: square
        });
        $("#launchpad").append(squareView.render().el);

        if(squareCount % 8 === 0) {
          $("#launchpad").append("<br/>");
        }
        squareCount++;
      }, this);
    }
  });

  var listView = new ListView();
})(jQuery);
