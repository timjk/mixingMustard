var Jazz = document.getElementById("Jazz1"); if(!Jazz || !Jazz.isJazz) Jazz = document.getElementById("Jazz2");
console.debug(Jazz.MidiOutList());
Jazz.MidiOutOpen('Launchpad');
Jazz.MidiOut(176,0,0); // Reset the launchpad

SC.initialize({
  client_id: "6603d805dad113c51b7df28b6737f2cc",
  redirect_uri: "http://example.com/callback.html",
});

Jazz.MidiInOpen(0,function(t,a){
  var square = $('[data-squarenumber="' + a[1] + '"]');
  console.debug($(square));

  markSquareAsArmed(square);
  playTrackOnSquare(square);
});

$("[class^=square]").click(function() {
  markSquareAsArmed($(this));
  playTrackOnSquare($(this));
});

function markSquareAsArmed(square) {
  square.attr("src", "./img/button-armed.png");

  Jazz.MidiOut(176,0,0); // Reset the launchpad
  Jazz.MidiOut(0x90,square.data("squarenumber"),15);

  var otherSquares = $("[class^=square]").not(square);
  $.each(otherSquares, function(i, val) {
    $(val).attr("src", "./img/button-passive.png");
  });
}

var currentSound;
function playTrackOnSquare(square) {
  var track = square.attr("url");
  var position = square.attr("position");
  SC.stream(track, function(sound){
    if (currentSound) {
      currentSound.stop();
    }
    currentSound = sound;
    sound.setPosition(position);
    sound.play();
  });
}

$(function() {
  $("square")
    .mouseover(function() {
      src = "./img/button-armed.png";
      $(this).attr("src", src);
    })

    .mouseout(function() {
      src = "./img/button-active.png";
      $(this).attr("src", src);
    });
});
