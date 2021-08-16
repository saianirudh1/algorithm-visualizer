import classes from '../../components/path/Box.module.css';
import { START_NODE_COL, START_NODE_ROW } from '../../utils/pathUtils';

/**
 * @summary This function is used to perform the Breadth First Search Algorithm.
 *
 * @param {Array} grid The grid of Box objects
 * @param {Box} startBox The startBox object representing the starting point of the grid.
 * @param {Array} visitedBoxesInOrder The Array to store the visited boxes in order.
 *
 * @returns {void}
 */
export const breadthFirstSearch = function (
  grid,
  startBox,
  visitedBoxesInOrder
) {
  const m = grid.length,
    n = grid[0].length;

  const seen = Array.from(Array(m), () => Array(n).fill(false));
  const dir = [-1, 0, 1, 0, -1];

  const bfsQueue = [];
  bfsQueue.push(startBox);
  startBox.distance = 0;
  seen[startBox.row][startBox.col] = true;

  while (bfsQueue.length !== 0) {
    const box = bfsQueue.shift();

    if (box.isWall) continue;

    visitedBoxesInOrder.push(box);

    if (box.isFinish) {
      break;
    }

    let currRow = box.row,
      currCol = box.col;

    for (let index = 1; index < dir.length; index++) {
      let r = currRow + dir[index - 1],
        c = currCol + dir[index];
      if (r >= 0 && r < m && c >= 0 && c < n && !seen[r][c]) {
        grid[r][c].distance = box.distance + 1;
        grid[r][c].previousBox = box;
        bfsQueue.push(grid[r][c]);
        seen[r][c] = true;
      }
    }
  }
};

/**
 * @summary This function is used to animate the boxes in order by simply adding the 'box-visited' class to each box-div in the dom
 *
 * @param {Array} visitedBoxesInOrder The visited boxes by the DFS Algorithm in order.
 *
 * @returns {Promise}
 */
const animateBreadthFirstSearch = async function (visitedbBoxesInOrder) {
  const promises = [];
  for (let index = 0; index < visitedbBoxesInOrder.length; index++) {
    const item = visitedbBoxesInOrder[index];
    const box = document.getElementById(`box-${item.row}-${item.col}`);
    setTimeout(() => {
      box.classList.add(classes['box-visited']);
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
 * @summary This function is used to animate the boxes of the shortest path by exploring the previous boxes attached.
 * The animation is done by simply adding the 'box-shortest-path' class to each box-div in the DOM
 *
 * @param {Box} lastBox The Target Box set by the user.
 *
 * @returns {Promise}
 */
const animateShortestPath = async function (lastBox) {
  const promises = [];
  for (
    let previousBox = lastBox, index = 0;
    previousBox !== null;
    previousBox = previousBox.previousBox, index++
  ) {
    const box = document.getElementById(
      `box-${previousBox.row}-${previousBox.col}`
    );

    setTimeout(() => {
      box.classList.remove(classes['box-visited']);
      box.classList.add(classes['box-shortest-path']);
    }, index * 40);

    promises.push(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, index * 40);
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
 * @summary This function is used to render the Breadth First Search animations when the user clicks the 'Visualize' button.
 *
 * @param {Array} grid The grid with boxes
 *
 * @returns {Promise}
 */
export const renderBreadthFirstSearch = async function (grid) {
  const startBox = grid[START_NODE_ROW][START_NODE_COL];
  const visitedBoxesInOrder = [];
  breadthFirstSearch(grid, startBox, visitedBoxesInOrder);
  await animateBreadthFirstSearch(visitedBoxesInOrder);

  const lastbox = visitedBoxesInOrder[visitedBoxesInOrder.length - 1];
  if (lastbox.isFinish) {
    await animateShortestPath(lastbox);
  } else {
    animateFailure(startBox);
  }
};
