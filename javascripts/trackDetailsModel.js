(function($){
  window.TrackDetailsModel = Backbone.Model.extend({
    defaults : {
      squareNumber: -1,
      trackSet: false,
      trackName: '',
      artistName: '',
      albumArt: './img/default.png'
    }
  });
})(jQuery);
