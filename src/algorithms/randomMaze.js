import { getInitialGrid, removeAnimationClasses } from '../utils/pathUtils';

const getRandomValue = function (minVal, maxVal) {
  let min = Math.ceil(minVal);
  let max = Math.floor(maxVal);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomMaze = function () {
  const grid = getInitialGrid();
  removeAnimationClasses();
  const row = grid.length,
    col = grid[0].length;

  let count = Math.round((row * col) / 3);
  while (count-- > 0) {
    const r = getRandomValue(0, row - 1);
    const c = getRandomValue(0, col - 1);

    if (!grid[r][c].isStart && !grid[r][c].isFinish) {
      grid[r][c].isWall = true;
    }
  }

  return grid;
};
