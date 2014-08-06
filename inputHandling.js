Jazz.MidiInOpen(0,function(t,a){
  if(a[2] === 0) {
    return; // Ignore the off signal
  }

  var square = $('[data-squarenumber="' + a[1] + '"]');
  console.debug($(square));

  markSquareAsArmed(square);
  playTrackOnSquare(square);
});

$(".square").click(function() {
  markSquareAsArmed($(this));
  playTrackOnSquare($(this));
});
