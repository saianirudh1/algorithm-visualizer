import classes from '../../components/sort/BarList.module.css';
import { addDelay } from '../../utils/arrayUtils';

const getBars = function () {
  const bars = document.querySelectorAll(`.${classes.bar}`);
  bars.forEach((bar) => {
    bar.classList.remove(`${classes.bar}`);
    bar.classList.add(`${classes.bar2}`);
  });

  return bars;
};

const setBars = async function () {
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

const doMerge = function (
  arr,
  leftIndex,
  midIndex,
  rightIndex,
  tempArr,
  animations
) {
  let k = leftIndex;
  let i = leftIndex;
  let j = midIndex + 1;
  while (i <= midIndex && j <= rightIndex) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (tempArr[i] <= tempArr[j]) {
      animations.push([k, tempArr[i]]);
      arr[k++] = tempArr[i++];
    } else {
      animations.push([k, tempArr[j]]);
      arr[k++] = tempArr[j++];
    }
  }

  while (i <= midIndex) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, tempArr[i]]);
    arr[k++] = tempArr[i++];
  }

  while (j <= rightIndex) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, tempArr[j]]);
    arr[k++] = tempArr[j++];
  }
};

const mergeSortHelper = function (
  arr,
  leftIndex,
  rightIndex,
  tempArr,
  animations
) {
  if (leftIndex === rightIndex) return;
  const middleIdx = Math.floor((leftIndex + rightIndex) / 2);
  mergeSortHelper(tempArr, leftIndex, middleIdx, arr, animations);
  mergeSortHelper(tempArr, middleIdx + 1, rightIndex, arr, animations);
  doMerge(arr, leftIndex, middleIdx, rightIndex, tempArr, animations);
};

const getMergeSortAnimations = function (arr) {
  const animations = [];
  if (arr.length <= 1) return arr;
  const tempArr = arr.slice();
  mergeSortHelper(arr, 0, arr.length - 1, tempArr, animations);
  return animations;
};

export const renderMergeSort = function (arr) {
  const animations = getMergeSortAnimations(arr);
  const bars = getBars();
  for (let i = 0; i < animations.length; i++) {
    const isColorChange = i % 3 !== 2;
    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const color = i % 3 === 0;
      const barOneStyle = bars[barOneIdx].style;
      const barTwoStyle = bars[barTwoIdx].style;
      if (color) {
        setTimeout(() => {
          barOneStyle.backgroundColor = 'var(--compare-bar)';
          barTwoStyle.backgroundColor = 'var(--main-bar)';
        }, i * 15);
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = 'var(--secondary-color)';
          barTwoStyle.backgroundColor = 'var(--secondary-color)';
        }, i * 15);
      }
    } else {
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = bars[barOneIdx].style;

        barOneStyle.height = `${newHeight}px`;
      }, i * 15);
    }
  }

  setTimeout(() => {
    setBars();
  }, 33250);

  return arr;
};
