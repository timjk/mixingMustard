var Jazz = document.getElementById("Jazz1"); if(!Jazz || !Jazz.isJazz) Jazz = document.getElementById("Jazz2");
Jazz.MidiInOpen(0,function(t,a){
  // Jazz.MidiOutLong(a);
  $(".square").eq(2).trigger( "click" );
});

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
