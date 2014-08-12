(function($){
  window.MainView = Backbone.View.extend({
    id: 'mainView',
    className: 'container',

    initialize: function(){
      this.render();
    },

    render: function(){
      var me = this;

      $(this.el).append('<h1>Launch Cloud</h1>');
      $(this.el).append('<h3>Cue SoundCloud clips from your Launchpad</h3>');

      var launchpadView = new window.LaunchpadView();
      var trackDetailsView = new window.TrackDetailsView();

      $(this.el).append(launchpadView.el.outerHTML);
      $(this.el).append(trackDetailsView.el.outerHTML);
    }
  });
})(jQuery);
