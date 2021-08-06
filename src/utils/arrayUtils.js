const generateRandomValues = function (maxHeight) {
  let min = Math.ceil(80);
  let max = Math.floor(maxHeight);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getArray = function () {
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

export const swap = function (bar1, bar2) {
  let main = document.getElementById('#main');
  return new Promise((resolve) => {
    let temp = bar1.style.transform;
    bar1.style.transform = bar2.style.transform;
    bar2.style.transform = temp;

    window.requestAnimationFrame(function () {
      setTimeout(() => {
        main.insertBefore(bar2, bar1);
        resolve();
      });
    });
  });
};

export const getHeight = function (height) {
  return Number(height.slice(0, -2));
};
