function MatrixModel() {
  BaseModel.call(this);
  this.attributes = {
    grid: [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
      ],

      score: 0,
      rows: 4, 
      columns: 4,
      winNum: 2048,
      startGame: false
  };
  var instance = this;
  MatrixModel = function () {
    return instance;
  };
}

MatrixModel.prototype = Object.create(BaseModel.prototype);
MatrixModel.prototype.constructor = MatrixModel;

MatrixModel.prototype.getRandomNumber = function () {
  return Math.random() < 0.6 ? '2' : '4';
};

MatrixModel.prototype.getRandomPosition = function () {
  return Math.floor(Math.random() * (4 - 0) + 0);
};

MatrixModel.prototype.getRandomPositionInit = function () {
  var firtsArray = [];
  var secondArray = [];
  firtsArray[0] = this.getRandomPosition();
  firtsArray[1] = this.getRandomPosition();
  secondArray[0] = this.getRandomPosition();
  secondArray[1] = this.getRandomPosition();
  if (firtsArray[0] === secondArray[0] && firtsArray[1] === secondArray[1]) {
    firtsArray[0] = this.getRandomPosition();
    firtsArray[1] = this.getRandomPosition();
    secondArray[0] = this.getRandomPosition();
    secondArray[1] = this.getRandomPosition();
  }
  this.attributes.grid[firtsArray[0]][firtsArray[1]] = this.getRandomNumber();
  this.attributes.grid[secondArray[0]][secondArray[1]] = this.getRandomNumber();
};

MatrixModel.prototype.getNumEveryMove = function () {
  var arr = this.attributes.grid, arrEmptyNum = [], i, j, length = arr.length;
  for (i = 0; i < length; i += 1) {
    for (j = 0; j < arr[i].length; j += 1) {
      if (arr[i][j] === '') {
        arrEmptyNum.push([i, j]);
      } 
    }
  }
  var randomIndex = Math.floor(Math.random() * (arrEmptyNum.length - 0) + 0);
  var index = arrEmptyNum[randomIndex];
  return (this.attributes.grid[index[0]][index[1]] = '2');
};

MatrixModel.prototype.filterZero = function (row) {
  return row.filter((pos) => pos != '');
};

MatrixModel.prototype.slide = function (row) {
  row = this.filterZero(row);
  var i, length = row.length;
  for (i = 0; i < length - 1; i += 1) {
    if (row[i] == row[i + 1]) {
      row[i] = String(Number(row[i] * 2));
      row[i + 1] = '';
      this.attributes.score += Number(row[i])
    }
  }
  row = this.filterZero(row);
  while (row.length < this.attributes.columns) {
    row.push('');
  }
  return row;
};

MatrixModel.prototype.slideLeft = function() {
  var r, rows =  this.attributes.rows;
  for(r = 0; r < rows; r += 1) {
    var row = this.attributes.grid[r];
    row = this.slide(row);
    this.attributes.grid[r] = row;
  }
};

MatrixModel.prototype.slideRight = function() {
  var r, rows =  this.attributes.rows;
  for(r = 0; r < rows; r += 1) {
    var row = this.attributes.grid[r];
    row.reverse();
    row = this.slide(row);
    row.reverse();
    this.attributes.grid[r] = row;
  }
};

MatrixModel.prototype.slideUp = function() {
  var c, columns = this.attributes.columns;
  for(c = 0; c < columns; c += 1) {
    var row = [this.attributes.grid[0][c], this.attributes.grid[1][c], this.attributes.grid[2][c], this.attributes.grid[3][c],]
    var r, rows =  this.attributes.rows;
    row = this.slide(row);
    for(r = 0; r < rows; r += 1) {
      this.attributes.grid[r][c] = row[r];
    }
  }
};

MatrixModel.prototype.slideDown = function() {
  var c, columns = this.attributes.columns;
  for(c = 0; c < columns; c += 1) {
    var row = [this.attributes.grid[0][c], this.attributes.grid[1][c], this.attributes.grid[2][c], this.attributes.grid[3][c],]
    var r, rows =  this.attributes.rows;
    row.reverse();
    row = this.slide(row);
    row.reverse();
    for(r = 0; r < rows; r += 1) {
      this.attributes.grid[r][c] = row[r];
    }
  }
};

MatrixModel.prototype.winGame = function(num) {
  var youWin = false;
  if(this.attributes.score > num) {
    youWin = confirm('You win! OK - restart game / Cancel - Continue game');
    if(youWin) {
      this.restart()
      this.attributes.score = 0;
    } 
    this.attributes.winNum = 100000
  }
  this.publish('changeData');
};

MatrixModel.prototype.startNewGame = function() {
  this.getRandomPositionInit();
  this.attributes.startGame = true;
  this.publish('changeData');
}; 

MatrixModel.prototype.restart = function() {
  var grid = this.attributes.grid, 
  i, length = grid.length;
  for(i = 0; i < length; i += 1) {
    this.attributes.grid[i].fill('')
  }
  this.attributes.grid = grid;
  this.startNewGame()
  this.publish('changeData')
}

MatrixModel.prototype.playGame = function (key) {
  switch (key) {
    case 'ArrowUp':
      this.slideUp()
      this.getNumEveryMove();
      break;
    case 'ArrowDown':
        this.slideDown()
        this.getNumEveryMove();
      break;
    case 'ArrowRight':
        this.slideRight();
        this.getNumEveryMove();
      break;
    case 'ArrowLeft':
      this.slideLeft();
      this.getNumEveryMove();
      break;
    case 'Escape':
      this.restart();
      break;
    default:
      return;
  }
  var result = this.attributes.score;
  this.winGame(this.attributes.winNum);
  this.publish('changeData');
  return result
};
