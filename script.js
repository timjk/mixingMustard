// Globals
var Jazz;
var squareClips = [];

initialize();
preloadClips();

function initialize() {
  Jazz = document.getElementById("Jazz1"); if(!Jazz || !Jazz.isJazz) Jazz = document.getElementById("Jazz2");
  Jazz.MidiOutOpen('Launchpad');
  Jazz.MidiOut(176,0,0); // Reset the launchpad

  SC.initialize({
    client_id: "6603d805dad113c51b7df28b6737f2cc",
    redirect_uri: "http://example.com/callback.html",
  });
}

function preloadClips() {
  var allSquares = $(".square");
  $.each(allSquares, function(i, square) {
    var squareNumber = $(square).data("squarenumber");
    var track = $(square).attr("url");
    var position = $(square).attr("position"); // Use position eventually...
    SC.stream(track, function(sound){
      squareClips[squareNumber] = sound;
    });
  });
}

function markSquareAsArmed(square) {
  square.attr("src", "./img/button-armed.png");

  // Jazz.MidiOut(176,0,0); // Reset the launchpad
  Jazz.MidiOut(0x90,square.data("squarenumber"),15);

  var otherSquares = $("[class^=square]").not(square);
  /*
  $.each(otherSquares, function(i, val) {
    $(val).attr("src", "./img/button-passive.png");
  });
  */
}

function playTrackOnSquare(square) {
  var squareNumber = square.data("squarenumber");

  squareClips[squareNumber].stop();
  squareClips[squareNumber].play();
}
