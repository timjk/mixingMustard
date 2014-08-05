SC.initialize({
  client_id: "6603d805dad113c51b7df28b6737f2cc",
  redirect_uri: "http://example.com/callback.html",
});

var currentSound;
$(".square").click(function() {
  var track = $(this).attr("url");
  var position = $(this).attr("position");
  SC.stream(track, function(sound){
    if (currentSound) {
      currentSound.stop();
    }
    currentSound = sound;
    sound.setPosition(position);
    sound.play();
  });
});
