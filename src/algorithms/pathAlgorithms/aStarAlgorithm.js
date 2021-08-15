import {
  FINISH_NODE_COL,
  FINISH_NODE_ROW,
  START_NODE_COL,
  START_NODE_ROW,
} from '../../utils/pathUtils';
import classes from '../../components/path/Box.module.css';

/**
 * @summary Calculates the Manhattan distance between to coordinates
 *
 * @param {number} x1 x coordinate for box 1
 * @param {number} y1 y coordinate for box 1
 * @param {number} x2 x coordinate for box 2
 * @param {number} y2 y coordinate for box 2
 *
 * @returns {number} Manhattan Distance
 */

const manhattanDist = function (x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

/**
 * @summary Sets the hScore value to each Box in the grid.
 * The hscore value is defined as the Manhattan distance between the current box and the finish box.
 *
 * In terms of the A* Search Algorithm - the hScore must be a value which predicts the distance between the current position
 * and the finished position
 *
 * @param {Array} grid The entire grid
 * @param {Box} finishBox The box where the user has placed the target i.e (where our search is finished)
 *
 * @returns {void}
 */
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

/**
 * @summary This function is used to determine the closest Box to the finish. This is not optimal as this can be done if we store the
 * openSet in an min-heap or PriorityQueue
 *
 * @param {Array} arr
 *
 * @returns {number} The Box with the minimum Fscore
 */
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

/**
 * @summary This function is used to perform the A* Search Alogirithm.
 * Learn more about A* Search here - https://en.wikipedia.org/wiki/A*_search_algorithm
 *
 * @param {Array} grid
 * @param {Box} startBox
 *
 * @returns {Array} The visited Boxes in order which they were evaluated.
 */
const aStarAlgorithm = function (grid, startBox) {
  const dir = [-1, 0, 1, 0, -1];
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

/**
 * @summary This function is used to animate the boxes in order by simply adding the 'box-visited' class to each box-div in the dom
 *
 * @param {Array} visited
 *
 * @returns {Promise}
 */
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

/**
 * @summary This function is used to animate the boxes of the shortest path by exploring the previous boxes attached.
 * The animation is done by simply adding the 'box-shortest-path' class to each box-div in the dom
 *
 * @param {Box} lastBox
 *
 * @returns {Promise}
 */

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

/**
 * @summary This function is used to animate the startBox if the finishBox is unreachable
 *
 * @param {Box} startBox
 *
 * @returns {void}
 */

const animateFailure = function (startBox) {
  const start = document.getElementById(`box-${startBox.row}-${startBox.col}`);
  start.classList.remove(classes['box-visited']);
  start.classList.add(classes['box-failure']);
};

/**
 * @summary This function is used to render the A* Search animations when the user clicks the 'Visualize' button.
 *
 * @param {Array} grid
 *
 * @returns {Promise}
 */
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
