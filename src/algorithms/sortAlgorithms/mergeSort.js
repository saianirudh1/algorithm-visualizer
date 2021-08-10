import classes from '../../components/sort/BarList.module.css';
import { getBars, setBars, delay } from '../../utils/arrayUtils';

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

const renderMergeSortAnimations = function (animations) {
  const bars = getBars(classes);
  const promises = [];
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

        promises.push(delay(i * 15));
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = 'var(--secondary-color)';
          barTwoStyle.backgroundColor = 'var(--secondary-color)';
        }, i * 15);
        promises.push(delay(i * 15));
      }
    } else {
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = bars[barOneIdx].style;

        barOneStyle.height = `${newHeight}px`;
      }, i * 15);
      promises.push(delay(i * 15));
    }
  }

  return Promise.all(promises);
};

export const renderMergeSort = async function (arr) {
  const animations = getMergeSortAnimations(arr);
  await renderMergeSortAnimations(animations);
  setBars(classes);
  return arr;
};
