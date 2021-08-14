import classes from '../../components/path/Box.module.css';
import { START_NODE_COL, START_NODE_ROW } from '../../utils/pathUtils';

const dir = [-1, 0, 1, 0, -1];

export const dfsHelper = function (grid, box, distance, seen, visited) {
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

export const depthFirstSearch = function (grid, startBox) {
  const seen = Array.from(Array(grid.length), () =>
    Array(grid[0].length).fill(false)
  );
  const visitedBoxesInOrder = [];
  seen[startBox.row][startBox.col] = true;
  dfsHelper(grid, startBox, 0, seen, visitedBoxesInOrder);

  return visitedBoxesInOrder;
};

export const animateVisitedBoxes = function (visitedBoxesInOrder) {
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

const animatePath = function (lastbox) {
  const promises = [];

  let prevBox = lastbox.previousBox;
  let index = 0;
  while (prevBox != null) {
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

    prevBox = prevBox.previousBox;
    index++;
  }

  return Promise.all(promises);
};

export const renderDepthFirstSearch = async function (grid) {
  const startBox = grid[START_NODE_ROW][START_NODE_COL];
  const visitedBoxesInOrder = depthFirstSearch(grid, startBox);
  await animateVisitedBoxes(visitedBoxesInOrder);
  console.log(visitedBoxesInOrder);

  const lastbox = visitedBoxesInOrder[visitedBoxesInOrder.length - 1];
  await animatePath(lastbox);
};
