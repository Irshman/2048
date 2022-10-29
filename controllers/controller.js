function Controller() {
  this.matrixModel = new MatrixModel();
  this.summaryModel = new SummaryModel();
}

Controller.prototype.onKeyPress = function(event) {
  if(this.matrixModel.attributes.startGame) {
    var result = this.matrixModel.playGame(event.code);
    this.summaryModel.getScore(result);
    this.summaryModel.getBestScore();
  }

  if(event.code === 'Escape') {
    this.summaryModel.nullScore();
  }

}

Controller.prototype.onClickNewGame = function() {
  this.matrixModel.startNewGame();
  this.summaryModel.nullScore();
}
