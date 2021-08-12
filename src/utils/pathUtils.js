const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const row = Math.round(windowWidth * 0.0175);
const col = Math.round(windowHeight * 0.014);

let START_NODE_ROW = 0;
let START_NODE_COL = 0;
let FINISH_NODE_ROW = 1;
let FINISH_NODE_COL = 1;

export const getInitialGrid = function () {
  START_NODE_ROW = Math.round(col / 2);
  START_NODE_COL = 4;

  FINISH_NODE_ROW = Math.round(col / 2);
  FINISH_NODE_COL = row - 4;

  const grid = [];
  for (let i = 0; i < row; i++) {
    const currentRow = [];
    for (let j = 0; j < col; j++) {
      currentRow.push(createBox(i, j));
    }
    grid.push(currentRow);
  }

  return grid;
};

export const getGridWithWall = function (grid, rowIndex, colIndex) {
  let newGrid = grid.map(function (arr) {
    return arr.slice();
  });

  const gridObj = newGrid[colIndex][rowIndex];
  newGrid[colIndex][rowIndex] = { ...gridObj, isWall: true };

  return newGrid;
};

export const getGridWithStart = function (grid, rowIndex, colIndex) {
  let newGrid = grid.map(function (arr) {
    return arr.slice();
  });

  const startGrid = newGrid[START_NODE_COL][START_NODE_ROW];
  newGrid[START_NODE_COL][START_NODE_ROW] = { ...startGrid, isStart: false };

  START_NODE_ROW = rowIndex;
  START_NODE_COL = colIndex;
  const gridObj = newGrid[colIndex][rowIndex];
  newGrid[colIndex][rowIndex] = { ...gridObj, isStart: true };

  return newGrid;
};

export const getGridWithTarget = function (grid, rowIndex, colIndex) {
  let newGrid = grid.map(function (arr) {
    return arr.slice();
  });

  const startGrid = newGrid[FINISH_NODE_COL][FINISH_NODE_ROW];
  newGrid[FINISH_NODE_COL][FINISH_NODE_ROW] = { ...startGrid, isFinish: false };

  FINISH_NODE_ROW = rowIndex;
  FINISH_NODE_COL = colIndex;

  const gridObj = newGrid[colIndex][rowIndex];
  newGrid[colIndex][rowIndex] = { ...gridObj, isFinish: true };

  return newGrid;
};

const createBox = function (col, row) {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
