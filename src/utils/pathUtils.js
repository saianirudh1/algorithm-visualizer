import classes from '../components/path/Box.module.css';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const row = Math.round(windowHeight * 0.014);
const col = Math.round(windowWidth * 0.0175);

export let START_NODE_ROW = 0;
export let START_NODE_COL = 0;
export let FINISH_NODE_ROW = 1;
export let FINISH_NODE_COL = 1;

export const getInitialGrid = function () {
  START_NODE_ROW = Math.round(row / 2);
  START_NODE_COL = 4;

  FINISH_NODE_ROW = Math.round(row / 2);
  FINISH_NODE_COL = col - 4;

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

  const gridObj = newGrid[rowIndex][colIndex];
  newGrid[rowIndex][colIndex] = { ...gridObj, isWall: true };

  return newGrid;
};

export const getGridWithStart = function (grid, rowIndex, colIndex) {
  let newGrid = grid.map(function (arr) {
    return arr.slice();
  });

  const startGrid = newGrid[START_NODE_ROW][START_NODE_COL];
  newGrid[START_NODE_ROW][START_NODE_COL] = { ...startGrid, isStart: false };

  START_NODE_ROW = rowIndex;
  START_NODE_COL = colIndex;
  const gridObj = newGrid[rowIndex][colIndex];
  newGrid[rowIndex][colIndex] = { ...gridObj, isStart: true };

  return newGrid;
};

export const getGridWithTarget = function (grid, rowIndex, colIndex) {
  let newGrid = grid.map(function (arr) {
    return arr.slice();
  });

  const startGrid = newGrid[FINISH_NODE_ROW][FINISH_NODE_COL];
  newGrid[FINISH_NODE_ROW][FINISH_NODE_COL] = { ...startGrid, isFinish: false };

  FINISH_NODE_ROW = rowIndex;
  FINISH_NODE_COL = colIndex;

  const gridObj = newGrid[rowIndex][colIndex];
  newGrid[rowIndex][colIndex] = { ...gridObj, isFinish: true };

  return newGrid;
};

const createBox = function (row, col) {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousBox: null,
  };
};

export const getCopy = function (grid) {
  const newGrid = [];
  for (let i = 0; i < grid.length; i++) {
    const currentRow = [];
    for (let j = 0; j < grid[0].length; j++) {
      currentRow.push({ ...grid[i][j] });
    }
    newGrid.push(currentRow);
  }

  return newGrid;
};

export const removeAnimationClasses = function () {
  const boxes = document.querySelectorAll(`.${classes.box}`);
  for (let box of boxes) {
    box.classList.remove(classes['box-visited']);
    box.classList.remove(classes['box-shortest-path']);
    box.classList.remove(classes['box-failure']);
  }
};
