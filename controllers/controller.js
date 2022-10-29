function Controller() {
  this.matrixModel = new MatrixModel();
  this.summaryModel = new SummaryModel();
}

Controller.prototype.onKeyPress = function(event) {
  if(this.matrixModel.attributes.startGame) {
    var result = this.matrixModel.playGame(event.code);
    this.summaryModel.nullScore();
    this.summaryModel.getScore(result);
    this.summaryModel.getBestScore();
  }
}

Controller.prototype.onClickNewGame = function() {
  this.matrixModel.startNewGame();
  this.summaryModel.nullScore();
}
