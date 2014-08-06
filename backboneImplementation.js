(function($){
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

      this.render();
      this.preloadClips();
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

        var square = $('[data-squarenumber="' + a[1] + '"]');
        console.debug($(square));

        me.markSquareAsArmed(square);
        me.playTrackOnSquare(square);
      });
    },

    render: function(){
      $(this.el).append("<img src='img/launchcloud.gif'/>");
      $(this.el).append("<h3>Use your Launchpad to cue soundcloud clips</h3>");

      var firstRow = [[0,292],[1,293],[2,294],[3,295]];
      var secondRow = [[16, 6533838],[17,151146412],[18,139133862],[19,153158256]];
      var thirdRow = [[32,2],[33,17],[34,19],[35,43]];
      var fourthRow = [[48,158851384],[49,2397001],[50,97075414],[51,113919687]];
      firstRow = this.convertRowToHtml(firstRow);
      secondRow = this.convertRowToHtmlPosition90000(secondRow);
      thirdRow = this.convertRowToHtml(thirdRow);
      fourthRow = this.convertRowToHtmlPosition90000(fourthRow);

      $(this.el).append(firstRow);
      $(this.el).append('<br/>');
      $(this.el).append(secondRow);
      $(this.el).append('<br/>');
      $(this.el).append(thirdRow);
      $(this.el).append('<br/>');
      $(this.el).append(fourthRow);
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

    convertRowToHtml: function(row) {
      return _.map(row, function(pair) {
        return '<img class="square" data-squarenumber="' + pair[0] + '" url="/tracks/' + pair[1] + '" position="0" src="./img/button-passive.png"/>';
      });
    },

    convertRowToHtmlPosition90000: function(row) {
      return _.map(row, function(pair) {
        return '<img class="square" data-squarenumber="' + pair[0] + '" url="/tracks/' + pair[1] + '" position="90000" src="./img/button-passive.png"/>';
      });
    },

    playClip: function(item) {
      this.playTrackOnSquare(item.target);
      this.markSquareAsArmed(item.target);
    },

    markSquareAsArmed: function(square) {
      $(square).attr("src", "./img/button-armed.png");
      Jazz.MidiOut(0x90, $(square).data("squarenumber"),15);
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
