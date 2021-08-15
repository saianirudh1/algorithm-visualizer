import classes from '../../components/sort/BarList.module.css';
import { getBars, setBars, delay } from '../../utils/arrayUtils';

/**
 * @summary This function is used to merge the left and right sorted arrays.
 *
 * @param {Array} arr The array with the bar heights.
 * @param {number} leftIndex The leftIndex of the  array
 * @param {number} midIndex The midIndex of the array
 * @param {number} rightIndex The rightIndex of the array
 * @param {Array} tempArr Temp array which is used to store the sorted arrays
 * @param {Array} animations The animations array used to store the animations
 *
 * @returns {void}
 */
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

/**
 * @summary This function is used to run the Merge Sort Algorithm and update the animations array
 *
 * @param {Array} arr The array with the bar heights
 * @param {number} leftIndex the leftIndex of the array
 * @param {number} rightIndex the rightIndex of the array
 * @param {Array} tempArr The tempArr which is used to store the arr data
 * @param {Array} animations The animations array which is used to store the animations
 *
 * @returns {void}
 */
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

/**
 * @summary This function is used to get the merge sort animations
 *
 * @param {Array} arr The array with bar heights
 *
 * @returns {void}
 */
const getMergeSortAnimations = function (arr) {
  const animations = [];
  if (arr.length <= 1) return arr;
  const tempArr = arr.slice();
  mergeSortHelper(arr, 0, arr.length - 1, tempArr, animations);
  return animations;
};

/**
 * @summary This function is used to render the merge sort animations.
 *
 * @param {Array} animations The array with the animations in order
 *
 * @returns
 */
const renderAnimations = function (animations) {
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

/**
 * @summary This function is used to render the Merge Sort Animations when the user clicks 'Visualize' button
 *
 * @param {Array} arr The array with the bar heights.
 *
 * @returns {Array} Sorted Array
 */
export const renderMergeSort = async function (arr) {
  const animations = getMergeSortAnimations(arr);
  await renderAnimations(animations);
  setBars(classes);
  return arr;
};
