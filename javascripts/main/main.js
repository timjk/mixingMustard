(function($) {
  window.libraryInitialiser = new window.LibraryInitialiser();
  $(document.body).append(new window.MainView().render().$el);
})(jQuery);
