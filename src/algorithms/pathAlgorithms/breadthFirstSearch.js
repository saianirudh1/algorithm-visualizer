import classes from '../../components/path/Box.module.css';
import { START_NODE_COL, START_NODE_ROW } from '../../utils/pathUtils';

const dir = [-1, 0, 1, 0, -1];

export const breadthFirstSearch = function (
  grid,
  startNode,
  visitedNodesInOrder
) {
  const m = grid.length,
    n = grid[0].length;

  const seen = Array.from(Array(m), () => Array(n).fill(false));

  const bfsQueue = [];
  bfsQueue.push(startNode);
  startNode.distance = 0;
  seen[startNode.row][startNode.col] = true;

  while (bfsQueue.length !== 0) {
    const box = bfsQueue.shift();

    if (box.isWall) continue;

    visitedNodesInOrder.push(box);

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

const animateBreadthFirstSearch = async function (visitedNodesInOrder) {
  let promises = [];
  for (let index = 0; index < visitedNodesInOrder.length; index++) {
    const item = visitedNodesInOrder[index];
    const box = document.getElementById(`box-${item.row}-${item.col}`);
    setTimeout(() => {
      box.classList.add(classes['box-visited']);
    }, index * 15);

    promises.push(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, index * 15);
      })
    );
  }

  return Promise.all(promises);
};

const animateShortestPath = async function (lastbox) {
  let promises = [];
  let previousBox = lastbox.previousBox;
  let index = 0;
  while (previousBox != null) {
    console.log(previousBox);
    const box = document.getElementById(
      `box-${previousBox.row}-${previousBox.col}`
    );

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

    previousBox = previousBox.previousBox;
    index++;
  }

  return Promise.all(promises);
};

const animateFailure = async function (startBox) {
  const start = document.getElementById(`box-${startBox.row}-${startBox.col}`);
  start.classList.remove(classes['box-visited']);
  start.classList.add(classes['box-failure']);
};

export const renderBreadthFirstSearch = async function (grid) {
  const startBox = grid[START_NODE_ROW][START_NODE_COL];
  const visitedBoxesInOrder = [];
  breadthFirstSearch(grid, startBox, visitedBoxesInOrder);
  await animateBreadthFirstSearch(visitedBoxesInOrder);

  const lastbox = visitedBoxesInOrder[visitedBoxesInOrder.length - 1];
  if (lastbox.isFinish) {
    await animateShortestPath(lastbox);
  } else {
    await animateFailure(startBox);
  }
};
