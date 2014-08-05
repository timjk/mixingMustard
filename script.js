var Jazz = document.getElementById("Jazz1"); if(!Jazz || !Jazz.isJazz) Jazz = document.getElementById("Jazz2");
var currentSound;

SC.initialize({
  client_id: "6603d805dad113c51b7df28b6737f2cc",
  redirect_uri: "http://example.com/callback.html",
});

Jazz.MidiInOpen(0,function(t,a){
  var square = $(".square" + a[1]);
  console.debug($(square));

  var track = $(square).attr("url");
  var position = $(square).attr("position");
  SC.stream(track, function(sound){
    if (currentSound) {
      currentSound.stop();
    }
    currentSound = sound;
    sound.setPosition(position);
    sound.play();
  });
});
