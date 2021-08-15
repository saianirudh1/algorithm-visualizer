import classes from '../../components/path/Box.module.css';
import { START_NODE_COL, START_NODE_ROW } from '../../utils/pathUtils';

const dir = [-1, 0, 1, 0, -1];

/**
 * @summary Helper recursive function to perform the DFS algorithm
 *
 * @param {Array} grid The grid of Box objects
 * @param {Box} box  The current Box object
 * @param {*} distance The distance from the startBox to the currentBox
 * @param {*} seen The Array to store the boxes which we have already explored
 * @param {*} visited  The array to store the boxes which we visit
 *
 * @returns {void}
 */
const dfsHelper = function (grid, box, distance, seen, visited) {
  if ((visited.length && visited[visited.length - 1].isFinish) || box.isWall) {
    return;
  }

  box.distance = distance;
  visited.push(box);

  if (box.isFinish) {
    return;
  }

  let currRow = box.row,
    currCol = box.col;

  const m = grid.length,
    n = grid[0].length;
  for (let index = 1; index < dir.length; index++) {
    let r = currRow + dir[index - 1],
      c = currCol + dir[index];

    if (r >= 0 && c >= 0 && r < m && c < n && !seen[r][c]) {
      seen[r][c] = true;
      const next = grid[r][c];
      next.previousBox = box;
      dfsHelper(grid, next, distance + 1, seen, visited);
    }
  }
};

/**
 * @summary This function is used to perform the Depth First Search Algorithm.
 *
 * @param {Array} grid The grid of Box objects
 * @param {Box} startBox The startBox object representing the starting point of the grid.
 *
 * @returns {Promise}
 */
const depthFirstSearch = function (grid, startBox) {
  const seen = Array.from(Array(grid.length), () =>
    Array(grid[0].length).fill(false)
  );
  const visitedBoxesInOrder = [];
  seen[startBox.row][startBox.col] = true;
  dfsHelper(grid, startBox, 0, seen, visitedBoxesInOrder);

  return visitedBoxesInOrder;
};

/**
 * @summary This function is used to animate the boxes in order by simply adding the 'box-visited' class to each box-div in the dom
 *
 * @param {Array} visitedBoxesInOrder The visited boxes by the DFS Algorithm in order.
 *
 * @returns {Promise}
 */
const animateVisitedBoxes = function (visitedBoxesInOrder) {
  const promises = [];
  for (let index = 0; index < visitedBoxesInOrder.length; index++) {
    const boxObject = visitedBoxesInOrder[index];
    const box = document.getElementById(
      `box-${boxObject.row}-${boxObject.col}`
    );

    setTimeout(() => {
      box.classList.add(classes['box-visited']);
    }, index * 30);

    promises.push(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, index * 30);
      })
    );
  }

  return Promise.all(promises);
};

/**
 * @summary This function is used to animate the boxes of the shortest path by exploring the previous boxes attached.
 * The animation is done by simply adding the 'box-shortest-path' class to each box-div in the DOM
 *
 * @param {Box} lastBox The Target Box set by the user.
 *
 * @returns {Promise}
 */
const animatePath = function (lastBox) {
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
    }, index * 60);

    promises.push(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, index * 60);
      })
    );
  }

  return Promise.all(promises);
};

/**
 * @summary This function is used to animate the startBox if the finishBox is unreachable
 *
 * @param {Box} startBox The startBox object representing the starting point of the grid.
 *
 * @returns {void}
 */
const animateFailure = function (startBox) {
  const start = document.getElementById(`box-${startBox.row}-${startBox.col}`);
  start.classList.remove(classes['box-visited']);
  start.classList.add(classes['box-failure']);
};

/**
 * @summary This function is used to render the Depth First Search animations when the user clicks the 'Visualize' button.
 *
 * @param {Array} grid The grid with boxes
 *
 * @returns {Promise}
 */
export const renderDepthFirstSearch = async function (grid) {
  const startBox = grid[START_NODE_ROW][START_NODE_COL];
  const visitedBoxesInOrder = depthFirstSearch(grid, startBox);
  await animateVisitedBoxes(visitedBoxesInOrder);
  console.log(visitedBoxesInOrder);

  const lastbox = visitedBoxesInOrder[visitedBoxesInOrder.length - 1];

  if (lastbox.isFinish) {
    await animatePath(lastbox);
  } else {
    animateFailure(startBox);
  }
};
