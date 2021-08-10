import classes from '../../components/sort/BarList.module.css';
import { setBars, getBars, delay } from '../../utils/arrayUtils';

const renderAnimations = function (animations) {
  let arr = getBars(classes);
  const promises = [];

  for (let index = 0; index < animations.length; index++) {
    const animation = animations[index];
    const { index: barIndex } = animation;
    const bar = arr[barIndex];

    if (animation.color) {
      const { change } = animation;
      setTimeout(() => {
        bar.style.backgroundColor = change;
      }, index * 8);

      promises.push(delay(index * 8));
    } else {
      const { height } = animation;
      setTimeout(() => {
        bar.style.height = `${height}px`;
      }, index * 8);

      promises.push(delay(index * 8));
    }
  }

  return Promise.all(promises);
};

const swapIndex = function (arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const partitionArray = function (arr, start, end, animations) {
  let pivot = arr[end];
  let pIndex = start;
  animations.push({ color: true, index: end, change: 'var(--main-bar)' });
  animations.push({ color: true, index: pIndex, change: 'var(--compare-bar)' });

  for (let index = start; index <= end - 1; index++) {
    if (arr[index] < pivot) {
      animations.push({ color: true, index, change: 'var(--swap-bar)' });
      animations.push({
        color: true,
        index: pIndex,
        change: 'var(--compare-bar)',
      });

      animations.push({ color: false, index, height: arr[pIndex] });
      animations.push({ color: false, index: pIndex, height: arr[index] });

      animations.push({ color: true, index, change: 'var(--secondary-color)' });
      animations.push({
        color: true,
        index: pIndex,
        change: 'var(--secondary-color)',
      });

      swapIndex(arr, index, pIndex);
      pIndex++;
      animations.push({
        color: true,
        index: pIndex,
        change: 'var(--compare-bar)',
      });
    }

    animations.push({ color: true, index, change: 'var(--secondary-color)' });
  }

  animations.push({ color: false, index: pIndex, height: arr[end] });
  animations.push({ color: false, index: end, height: arr[pIndex] });

  swapIndex(arr, pIndex, end);

  animations.push({
    color: true,
    index: end,
    change: 'var(--secondary-color)',
  });

  animations.push({
    color: true,
    index: pIndex,
    change: 'var(--secondary-color)',
  });

  return pIndex;
};

const quickSortHelper = function (arr, start, end, animations) {
  if (start < end) {
    const pivotIndex = partitionArray(arr, start, end, animations);

    quickSortHelper(arr, start, pivotIndex - 1, animations);
    quickSortHelper(arr, pivotIndex + 1, end, animations);
  }
};

export const renderQuickSort = async function (arr) {
  let animations = [];
  let tempArr = arr.slice();
  quickSortHelper(tempArr, 0, tempArr.length - 1, animations);
  await renderAnimations(animations);
  setBars(classes);

  return tempArr;
};
