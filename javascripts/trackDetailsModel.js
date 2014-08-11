(function($){
  window.TrackDetailsModel = Backbone.Model.extend({
    defaults : {
      trackName: 'Cool song',
      artistName: 'Cool artist',
      albumArt: './img/smile.png'
    }
  });
})(jQuery);
