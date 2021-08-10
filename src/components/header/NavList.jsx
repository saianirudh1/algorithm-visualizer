import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './NavList.module.css';
import { algorithmActions } from '../../store/algorithm';

import {
  sortingAlgorithms,
  pathAlgorithms,
} from '../../constants/appConstants';

function NavList(props) {
  const type = props.type;
  const itemList = type === 'sort' ? sortingAlgorithms : pathAlgorithms;

  const [showDropDown, setShowDropDown] = useState(false);
  const algorithmName = useSelector((state) => state.algorithm.name);
  const bars = useSelector((state) => state.array.arr);
  const dispatch = useDispatch();

  const showList = function () {
    setShowDropDown(true);
  };

  const hideList = function () {
    setShowDropDown(false);
  };

  const algorithmSelector = function (e) {
    dispatch(
      algorithmActions.setAlgorithm({
        id: e.target.id,
        name: e.target.textContent,
        time: bars.length * e.target.dataset.time,
      })
    );

    props.enableVisualize();
  };

  const algorithms = itemList.map((item, index) => {
    let styles =
      itemList.length - 1 === index
        ? `${classes['dropdown--item']}  ${classes['last--item']}`
        : classes['dropdown--item'];

    return (
      <li
        key={item.id}
        id={item.id}
        data-time={item.time}
        className={styles}
        onClick={algorithmSelector}
      >
        {item.name}
      </li>
    );
  });

  return (
    <ul
      className={classes.dropdown}
      onMouseEnter={showList}
      onMouseLeave={hideList}
    >
      <label className={classes['dropdown--btn']}>{algorithmName}</label>
      <span className={classes.arrow}>{'\u25BC'}</span>
      {showDropDown && algorithms}
    </ul>
  );
}

export default NavList;
