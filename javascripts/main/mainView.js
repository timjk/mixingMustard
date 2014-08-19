(function($) {
  window.MainView = Backbone.View.extend({
    id: 'mainView',
    className: 'container',

    render: function() {
      var me = this;

      this.$el.append('<h1>Launch Cloud</h1>');
      this.$el.append('<h3>Cue SoundCloud clips from your Launchpad</h3>');

      var launchpadView = new window.LaunchpadView();
      var trackDetailsView = new window.TrackDetailsView();

      this.$el.append(launchpadView.render().$el);
      this.$el.append(trackDetailsView.render().$el);

      return this;
    },
  });
})(jQuery);
