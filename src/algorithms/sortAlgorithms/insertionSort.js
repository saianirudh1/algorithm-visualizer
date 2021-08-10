import classes from '../../components/sort/BarList.module.css';
import { addDelay, getHeight, swap } from '../../utils/arrayUtils';

const renderAnimations = async function () {
  const promises = [];

  let arr = document.querySelectorAll(`.${classes.bar}`);
  let delay = 250;

  for (let index = 1; index < arr.length; index++) {
    let hole = index;

    let currVal = getHeight(arr[index].style.height);
    let prevVal = getHeight(arr[index - 1].style.height);

    promises.push(await addDelay(delay));

    while (hole > 0) {
      arr[hole - 1].style.backgroundColor = 'var(--compare-bar)';

      if (prevVal > currVal) {
        promises.push(await swap(arr[hole - 1], arr[hole]));
        arr[hole - 1].style.backgroundColor = 'var(--secondary-color)';
        arr = document.querySelectorAll(`.${classes.bar}`);
      }

      hole--;
      if (hole > 0) {
        prevVal = getHeight(arr[hole - 1].style.height);
      }
    }

    arr[index].style.backgroundColor = 'var(--main-bar)';
    delay = 0;
  }

  return Promise.all(promises);
};

export const renderInsertionSort = async function () {
  await renderAnimations();

  let arr = document.querySelectorAll(`.${classes.bar}`);
  for (let index = arr.length - 1; index >= 0; index--) {
    await addDelay(10);
    arr[index].style.backgroundColor = 'var(--done-bar)';
  }

  await addDelay(250);

  for (let index = 0; index < arr.length; index++) {
    await addDelay(10);
    arr[index].style.backgroundColor = 'var(--secondary-color)';
  }
};
