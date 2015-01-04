(function($) {
  window.MainView = Backbone.View.extend({
    id: 'mainView',
    className: 'container',

    render: function() {
      var me = this;

      var launchpadView = new window.LaunchpadView();
      var trackDetailsView = new window.TrackDetailsView();

      this.$el.append(launchpadView.render().$el);
      this.$el.append(trackDetailsView.render().$el);

      return this;
    },
  });
})(jQuery);
