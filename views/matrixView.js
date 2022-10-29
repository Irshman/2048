function MatrixView() {
  this.controller = new Controller();
  this.matrixModel = new MatrixModel();
  this.template = document.getElementById('matrixTemplate').innerHTML;
  this.className = 'table';
  BaseView.call(this);
}

MatrixView.prototype = Object.create(BaseView.prototype);
MatrixView.prototype.constructor = MatrixView;

MatrixView.prototype.beforeRender = function () {
  this.matrixModel.subscribe('changeData', this.reRender, this);
};

MatrixView.prototype.render = function () {
  var i,
    j,
    attributes = this.matrixModel.attributes,
    str = '';

  for (i = 0; i < attributes.grid.length; i += 1) {
    str += '<div class="row">';

    for (j = 0; j < attributes.grid[i].length; j += 1) {
      str +=
        '<div class="cell appear-' +
        attributes.grid[i][j] +
        '">' +
        attributes.grid[i][j] +
        '</div>';
    }

    str += '</div>';
  }
  return this.template.replace('{{matrix}}', str);
};

MatrixView.prototype.afterRender = function () {
  window.addEventListener(
    'keydown',
    this.controller.onKeyPress.bind(this.controller)
  );
  var newGameBtn = document.getElementById('newGameBtn');
  newGameBtn.addEventListener(
    'click',
    this.controller.onClickNewGame.bind(this.controller)
  );
};
