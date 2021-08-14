import { useDispatch, useSelector } from 'react-redux';
import Button from '../UI/Button';

import target from '../../img/target.png';
import start from '../../img/start.png';
import wall from '../../img/wall.png';
import classes from './Controls.module.css';

import {
  getCopy,
  getInitialGrid,
  removeAnimationClasses,
} from '../../utils/pathUtils';
import { renderPatternOne } from '../../mazePatterns/patternOne';

import { gridActions } from '../../store/grid';

function Controls() {
  const dispatch = useDispatch();
  const gridState = useSelector((state) => state.grid.grid);
  const control = useSelector((state) => state.input.control);

  const handleClick = function (e) {
    const type = e.target.dataset.type;
    dispatch(gridActions.setType(type));
  };

  const handleClearBoard = function () {
    dispatch(gridActions.setGrid(getInitialGrid()));
    dispatch(gridActions.setType(''));
    removeAnimationClasses();
  };

  const handlePatternOne = function () {
    const grid = getCopy(gridState.slice());
    const newGrid = renderPatternOne(grid);

    dispatch(gridActions.setGrid(newGrid));
  };

  return (
    <div className={classes.controls}>
      <Button
        className={classes['control-btn']}
        onClick={handleClick}
        data-type="start"
        isDisabled={control}
      >
        <img src={start} alt="Start" />
        Start
      </Button>
      <Button
        className={classes['control-btn']}
        onClick={handleClick}
        data-type="target"
        isDisabled={control}
      >
        <img src={target} alt="Target" />
        Target
      </Button>
      <Button
        className={classes['control-btn']}
        onClick={handleClick}
        data-type="wall"
        isDisabled={control}
      >
        <img src={wall} alt="Wall" />
        Wall
      </Button>
      <Button
        className={classes['control-btn']}
        onClick={handleClearBoard}
        isDisabled={control}
      >
        Clear Board
      </Button>
      <Button
        className={classes['control-btn']}
        onClick={handlePatternOne}
        isDisabled={control}
      >
        Pattern 1
      </Button>
      <Button className={classes['control-btn']} isDisabled={control}>
        Pattern 2
      </Button>
      <Button className={classes['control-btn']} isDisabled={control}>
        Pattern 3
      </Button>
      <Button className={classes['control-btn']} isDisabled={control}>
        Pattern 4
      </Button>
    </div>
  );
}

export default Controls;
