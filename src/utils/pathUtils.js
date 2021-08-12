export const getBoxes = function (maxHeight) {
  const windowSize = window.innerWidth;
  const col = Math.ceil(windowSize * 0.0175);
  const row = 10;

  const boxes = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      boxes.push([i, j]);
    }
  }

  return boxes;
};
