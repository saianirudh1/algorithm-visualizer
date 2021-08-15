import classes from '../../components/path/Box.module.css';
import { START_NODE_COL, START_NODE_ROW } from '../../utils/pathUtils';

const dir = [-1, 0, 1, 0, -1];

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

const depthFirstSearch = function (grid, startBox) {
  const seen = Array.from(Array(grid.length), () =>
    Array(grid[0].length).fill(false)
  );
  const visitedBoxesInOrder = [];
  seen[startBox.row][startBox.col] = true;
  dfsHelper(grid, startBox, 0, seen, visitedBoxesInOrder);

  return visitedBoxesInOrder;
};

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

const animateFailure = function (startBox) {
  const start = document.getElementById(`box-${startBox.row}-${startBox.col}`);
  start.classList.remove(classes['box-visited']);
  start.classList.add(classes['box-failure']);
};

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
