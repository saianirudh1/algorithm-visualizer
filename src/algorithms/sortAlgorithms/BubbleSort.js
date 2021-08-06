import classes from '../../components/sort/BarList.module.css';
import { getHeight, swap, addDelay } from '../../utils/arrayUtils';

export const renderBubbleSort = async function () {
  let delay = 250;
  let arr = document.querySelectorAll(`.${classes.bar}`);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].style.backgroundColor = 'var(--main-bar)';
      arr[j + 1].style.backgroundColor = 'var(--compare-bar)';

      await addDelay(delay);

      let value1 = getHeight(arr[j].style.height);
      let value2 = getHeight(arr[j + 1].style.height);
      if (value1 > value2) {
        arr[j + 1].style.backgroundColor = 'var(--swap-bar)';
        await swap(arr[j], arr[j + 1]);
        arr = document.querySelectorAll(`.${classes.bar}`);
      }

      arr[j].style.backgroundColor = 'var(--secondary-color)';
      arr[j + 1].style.backgroundColor = 'var(--secondary-color);';
    }

    arr[arr.length - i - 1].style.backgroundColor = 'var(--done-bar)';
    delay = 0;
  }

  arr = document.querySelectorAll(`.${classes.bar}`);
  for (let i = arr.length - 1; i >= 0; i--) {
    await addDelay(10);
    arr[i].style.backgroundColor = 'var(--secondary-color)';
  }
};
