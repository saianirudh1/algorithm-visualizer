import classes from '../../components/sort/BarList.module.css';
import { swap, getHeight } from '../../utils/arrayUtils';

export const renderSelectionSort = async function () {
  let arr = document.querySelectorAll(`.${classes.bar}`);
  let delay = 250;

  let currIndex = 0;
  arr[currIndex].style.backgroundColor = 'var(--main-bar)';
  while (currIndex < arr.length) {
    let minIndex = currIndex,
      min = getHeight(arr[currIndex].style.height);
    for (let index = currIndex + 1; index < arr.length; index++) {
      arr[index].style.backgroundColor = 'var(--compare-bar)';

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      let currVal = getHeight(arr[index].style.height);
      if (min > currVal) {
        min = getHeight(arr[index].style.height);
        if (minIndex !== currIndex) {
          arr[minIndex].style.backgroundColor = 'var(--secondary-color)';
        }
        minIndex = index;

        arr[minIndex].style.backgroundColor = 'var(--done-bar)';
      } else {
        arr[index].style.backgroundColor = 'var(--secondary-color)';
      }
    }

    await swap(arr[currIndex], arr[minIndex]);
    arr = document.querySelectorAll(`.${classes.bar}`);
    arr[currIndex].style.backgroundColor = 'var(--done-bar)';
    delay = 0.001;
    currIndex++;
  }

  arr = document.querySelectorAll(`.${classes.bar}`);
  for (let i = 0; i < arr.length; i++) {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 10)
    );
    arr[i].style.backgroundColor = 'var(--secondary-color)';
  }
};
