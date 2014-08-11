(function($){
  window.TrackDetailsModel = Backbone.Model.extend({
    defaults : {
      trackSet: false,
      trackName: '',
      artistName: '',
      albumArt: ''
    }
  });
})(jQuery);
