var app = angular.module('app', ['ngRoute']);
app.controller('appController', function($scope) {
  var CLIENT_ID = '6603d805dad113c51b7df28b6737f2cc';

  var track = { url: "https://soundcloud.com/simonhfrost/the-flatinator", title: "Hello", artist: "Someone", position: "1000", duration: "4000", artUrl: "" };
  $scope.row = [ track, track, track, track, track, track, track, track ];
  $scope.selectedSquare = $scope.row[0];

  var initialiseSoundcloud = function() {
    SC.initialize({
      client_id: CLIENT_ID,
      redirect_uri: 'http://example.com/callback.html',
    });
  };

  initialiseSoundcloud();

  var playTrack = function(sound) {
    // TODO: Cache this sound
    sound.stop();
    sound.setPosition(5000);
    sound.play();
    window.clearTimeout(this.currentTimeout);
    this.currentTimeout = setTimeout(_.bind(this.stop, this), 5000);
  };

  var getSoundTrack = function(trackNumber) {
    SC.stream(trackNumber, function(sound) {
      playTrack(sound);
    });
  };

  var setTrackInfo = function(selectedSquare, trackInfo) {
    selectedSquare.title = trackInfo.title;
    selectedSquare.artist = trackInfo.user.username;
    if (trackInfo.artwork_url) {
      selectedSquare.artUrl = trackInfo.artwork_url;
    } else {
      selectedSquare.artUrl = trackInfo.user.avatar_url;
    }
    selectedSquare.duration = trackInfo.duration;
  };

  $scope.click = function($index) {
    var selectedSquare = $scope.row[$index];
    var trackUrl = $scope.row[$index].url;

    SC.get('/resolve', { url: trackUrl }, function(track) {
      var trackId = track.id;
      getSoundTrack(trackId);
      $.getJSON('http://api.soundcloud.com/tracks/' + trackId + '.json?client_id=' + CLIENT_ID, function(trackInfo) {
        setTrackInfo(selectedSquare, trackInfo);
      });
    });

    $scope.selectedSquare = selectedSquare;
  };

  $scope.changeTrackClicked = function() {
    var url = prompt("URL: ");
    if (url) {
      $scope.selectedSquare.url = url;
    }
  };
});
