import classes from '../../components/sort/BarList.module.css';

export const getBubbleSortAnimations = async function () {
  let delay = 250;
  let arr = document.querySelectorAll(`.${classes.bar}`);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].style.backgroundColor = '#00838f';
      arr[j + 1].style.backgroundColor = '#d84315';

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      let value1 = Number(arr[j].style.height.slice(0, -2));
      let value2 = Number(arr[j + 1].style.height.slice(0, -2));
      if (value1 > value2) {
        arr[j + 1].style.backgroundColor = '#d32f2f';
        await swap(arr[j], arr[j + 1]);
        arr = document.querySelectorAll(`.${classes.bar}`);
      }

      arr[j].style.backgroundColor = 'var(--secondary-color)';
      arr[j + 1].style.backgroundColor = 'var(--secondary-color);';
    }

    arr[arr.length - i - 1].style.backgroundColor = '#2e7d32';
    delay = 0;
  }

  arr = document.querySelectorAll(`.${classes.bar}`);
  for (let i = arr.length - 1; i >= 0; i--) {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 10)
    );
    arr[i].style.backgroundColor = 'var(--secondary-color)';
  }
};

const swap = function (bar1, bar2) {
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
