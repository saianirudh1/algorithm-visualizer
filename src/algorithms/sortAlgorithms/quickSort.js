const swap = function (arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const partitionArray = function (arr, start, end) {
  let pivot = arr[end];
  let pIndex = start;

  for (let index = start; index <= end - 1; index++) {
    if (arr[index] < pivot) {
      swap(arr, index, pIndex);
      pIndex++;
    }
  }
  swap(arr, pIndex, end);

  return pIndex;
};

const quickSortHelper = function (arr, start, end) {
  if (start < end) {
    const pivotIndex = partitionArray(arr, start, end);

    quickSortHelper(arr, start, pivotIndex - 1);
    quickSortHelper(arr, pivotIndex + 1, end);
  }
};

export const renderQuickSort = function (arr) {
  let tempArr = arr.slice();
  quickSortHelper(tempArr, 0, tempArr.length - 1);
  console.log(tempArr);
  // tempArr.sort((a, b) => a - b);
  //   console.log(tempArr);

  return tempArr;
};
