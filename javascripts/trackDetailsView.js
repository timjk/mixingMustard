(function($){
  window.TrackDetailsView = Backbone.View.extend({
    render: function() {
      $('#trackDetails').append(this.model.get('trackName'));
      $('#trackDetails').append('<br/>');
      $('#trackDetails').append(this.model.get('artistName'));
      $('#trackDetails').append('<br/>');
      $('#trackDetails').append(this.model.get('albumArt'));
      $('#trackDetails').append('<br/>');
    }
  });
})(jQuery);
