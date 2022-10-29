function SummaryModel() {
  BaseModel.call(this);
  this.attributes = {
    totalScore: localStorage.getItem('score') || 0,
    bestScore: localStorage.getItem('bestScore') || 0
  };
  var instance = this;
  SummaryModel = function() {
    return instance;
  };

}

SummaryModel.prototype = Object.create(BaseModel.prototype);
SummaryModel.prototype.constructor = SummaryModel;

SummaryModel.prototype.getScore = function(result) {
  this.attributes.totalScore = result;
  window.localStorage.setItem('score', this.attributes.totalScore);
  this.publish('changeData');
};

SummaryModel.prototype.getBestScore = function() {
  var score = this.attributes.totalScore, bestScore = this.attributes.bestScore;
  if(score < bestScore) {
    bestScore = window.localStorage.getItem('bestScore');
  } else {
    bestScore = score;
  }
  window.localStorage.setItem('bestScore', this.attributes.bestScore);
  this.publish('changeData');
};

SummaryModel.prototype.nullScore = function() {
  this.attributes.totalScore = 0;
  window.localStorage.removeItem('score');
  this.publish('changeData');
}