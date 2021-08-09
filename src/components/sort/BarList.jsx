import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../UI/Button';
import classes from './BarList.module.css';

import { getArray } from '../../utils/arrayUtils';

import { arrayActions } from '../../store/array';

function BarList() {
  const dispatch = useDispatch();
  const arr = useSelector((state) => state.array.arr);
  const isDisabled = useSelector((state) => state.input.generate);

  useEffect(() => {
    dispatch(arrayActions.setArray(getArray()));
  }, [dispatch]);

  const generateArrayHandler = function () {
    dispatch(arrayActions.setArray(getArray()));
  };

  const bars = arr.map((item, index) => (
    <div key={index} className={classes.bar} style={{ height: item }} />
  ));

  return (
    <div className={classes.main}>
      <Button
        className={classes.generate}
        onClick={generateArrayHandler}
        isDisabled={isDisabled}
      >
        Generate New Array
      </Button>
      <div className={classes.list} id="#main">
        {bars}
      </div>
    </div>
  );
}

export default BarList;
