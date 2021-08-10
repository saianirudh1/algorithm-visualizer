import classes from '../../components/sort/BarList.module.css';
import { getHeight, swap, addDelay } from '../../utils/arrayUtils';

const renderAnimations = async function () {
  const promises = [];

  let delay = 170;
  let arr = document.querySelectorAll(`.${classes.bar}`);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].style.backgroundColor = 'var(--main-bar)';
      arr[j + 1].style.backgroundColor = 'var(--compare-bar)';

      promises.push(await addDelay(delay));

      let value1 = getHeight(arr[j].style.height);
      let value2 = getHeight(arr[j + 1].style.height);
      if (value1 > value2) {
        arr[j + 1].style.backgroundColor = 'var(--swap-bar)';
        promises.push(await swap(arr[j], arr[j + 1]));
        arr = document.querySelectorAll(`.${classes.bar}`);
      }

      arr[j].style.backgroundColor = 'var(--secondary-color)';
      arr[j + 1].style.backgroundColor = 'var(--secondary-color);';
    }

    arr[arr.length - i - 1].style.backgroundColor = 'var(--done-bar)';
    delay = 0;
  }

  return Promise.all(promises);
};

export const renderBubbleSort = async function () {
  await renderAnimations();

  let bars = document.querySelectorAll(`.${classes.bar}`);
  for (let i = bars.length - 1; i >= 0; i--) {
    await addDelay(10);
    bars[i].style.backgroundColor = 'var(--secondary-color)';
  }
};
