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

export const addDelay = function (delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

export const getBars = function (classes) {
  const bars = document.querySelectorAll(`.${classes.bar}`);
  bars.forEach((bar) => {
    bar.classList.remove(`${classes.bar}`);
    bar.classList.add(`${classes.bar2}`);
  });

  return bars;
};

export const setBars = async function (classes) {
  const bars = document.querySelectorAll(`.${classes.bar2}`);
  bars.forEach((bar) => {
    bar.classList.remove(`${classes.bar2}`);
    bar.classList.add(`${classes.bar}`);
  });

  let mid = Math.floor(bars.length / 2);
  let left = mid,
    right = mid;

  while (left >= 0 || right < bars.length) {
    await addDelay(10);
    if (left >= 0) {
      bars[left].style.backgroundColor = 'var(--done-bar)';
    }
    if (right < bars.length) {
      bars[right].style.backgroundColor = 'var(--done-bar)';
    }
    left--;
    right++;
  }

  left = mid;
  right = mid;

  while (left >= 0 || right < bars.length) {
    await addDelay(10);
    if (left >= 0) {
      bars[left].style.backgroundColor = 'var(--secondary-color)';
    }
    if (right < bars.length) {
      bars[right].style.backgroundColor = 'var(--secondary-color)';
    }
    left--;
    right++;
  }
};

export const delay = function (t) {
  return new Promise((resolve) => {
    setTimeout(resolve, t);
  });
};
