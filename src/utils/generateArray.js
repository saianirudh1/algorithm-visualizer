const generateRandomValues = function (maxHeight) {
  let min = Math.ceil(80);
  let max = Math.floor(maxHeight);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getArray = function () {
  const windowSize = window.innerWidth;
  const arrSize = Math.round(windowSize * 0.07);
  const maxHeight = Math.round(windowSize / 2.4);

  const arr = [];

  let size = arrSize;

  while (size > 0) {
    let val = generateRandomValues(maxHeight);
    arr.push(val);
    size--;
  }

  return arr;
};

export default getArray;
