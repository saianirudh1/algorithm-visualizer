import {
  FINISH_NODE_COL,
  FINISH_NODE_ROW,
  START_NODE_COL,
  START_NODE_ROW,
} from '../../utils/pathUtils';
import classes from '../../components/path/Box.module.css';

const manhattanDist = function (x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const calcHscore = function (grid, finishBox) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      grid[row][col].hScore = manhattanDist(
        row,
        col,
        finishBox.row,
        finishBox.col
      );
    }
  }
};

const getClosest = function (arr) {
  let minFScore = Infinity;
  let min = null;

  for (let val of arr) {
    if (minFScore > val.fScore) {
      minFScore = val.fScore;
      min = val;
    } else if (
      minFScore === val.fScore &&
      min !== null &&
      min.hScore > val.hScore
    ) {
      min = val;
    }
  }

  return min;
};

const dir = [-1, 0, 1, 0, -1];

const aStarAlgorithm = function (grid, startBox) {
  let openSet = [];
  openSet.push(startBox);

  const visitedBoxes = [];

  startBox.gScore = 0;
  startBox.fScore = startBox.gScore + startBox.hScore;

  while (openSet.length > 0) {
    const currentBox = getClosest(openSet);

    visitedBoxes.push(currentBox);

    if (!currentBox || currentBox.isFinish) {
      break;
    }

    openSet = openSet.filter((item) => item !== currentBox);

    let currRow = currentBox.row,
      currCol = currentBox.col;

    for (let index = 1; index < dir.length; index++) {
      let r = currRow + dir[index - 1],
        c = currCol + dir[index];

      if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) {
        continue;
      }

      if (grid[r][c].isWall) continue;

      const tempScore = currentBox.gScore + 1;
      if (tempScore < grid[r][c].gScore) {
        grid[r][c].previousBox = currentBox;
        grid[r][c].gScore = tempScore;
        grid[r][c].fScore = grid[r][c].gScore + grid[r][c].hScore;
        if (!openSet.includes(grid[r][c])) {
          openSet.push(grid[r][c]);
        }
      }
    }
  }

  return visitedBoxes;
};

const animateVisitedBoxes = function (visited) {
  const promises = [];
  for (let index = 0; index < visited.length; index++) {
    const boxObject = visited[index];
    if (boxObject === null) {
      continue;
    }

    const box = document.getElementById(
      `box-${boxObject.row}-${boxObject.col}`
    );

    setTimeout(() => {
      box.classList.add(classes['box-visited']);
    }, index * 20);

    promises.push(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, index * 20);
      })
    );
  }

  return Promise.all(promises);
};

const animateShortestPath = function (lastBox) {
  const promises = [];

  for (
    let prevBox = lastBox, index = 0;
    prevBox !== null;
    prevBox = prevBox.previousBox, index++
  ) {
    const box = document.getElementById(`box-${prevBox.row}-${prevBox.col}`);

    setTimeout(() => {
      box.classList.remove(classes['box-visited']);
      box.classList.add(classes['box-shortest-path']);
    }, index * 25);

    promises.push(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, index * 25);
      })
    );
  }

  return Promise.all(promises);
};

const animateFailure = function (startBox) {
  const start = document.getElementById(`box-${startBox.row}-${startBox.col}`);
  start.classList.remove(classes['box-visited']);
  start.classList.add(classes['box-failure']);
};

export const renderAStarSearch = async function (grid) {
  const finishBox = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const startBox = grid[START_NODE_ROW][START_NODE_COL];
  calcHscore(grid, finishBox);
  const visitedBoxes = aStarAlgorithm(grid, startBox);

  await animateVisitedBoxes(visitedBoxes);

  const lastbox = visitedBoxes[visitedBoxes.length - 1];
  if (lastbox) {
    await animateShortestPath(lastbox);
  } else {
    animateFailure(startBox);
  }
};
