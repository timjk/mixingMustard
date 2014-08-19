window.libraryInitialiser = new window.LibraryInitialiser({secondStage: secondStage});

function secondStage() {
  var mainView = new window.MainView();
  $(document.body).append(mainView.render().$el);
}
