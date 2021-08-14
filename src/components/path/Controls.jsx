import { useDispatch } from 'react-redux';
import Button from '../UI/Button';

import target from '../../img/target.png';
import start from '../../img/start.png';
import wall from '../../img/wall.png';
import classes from './Controls.module.css';

import { gridActions } from '../../store/grid';
import { getInitialGrid, removeAnimationClasses } from '../../utils/pathUtils';

function Controls() {
  const dispatch = useDispatch();

  const handleClick = function (e) {
    const type = e.target.dataset.type;
    dispatch(gridActions.setType(type));
  };

  const handleClearBoard = function () {
    dispatch(gridActions.setGrid(getInitialGrid()));
    dispatch(gridActions.setType(''));
    removeAnimationClasses();
  };

  return (
    <div className={classes.controls}>
      <Button
        className={classes['control-btn']}
        onClick={handleClick}
        data-type="start"
      >
        <img src={start} alt="Start" />
        Start
      </Button>
      <Button
        className={classes['control-btn']}
        onClick={handleClick}
        data-type="target"
      >
        <img src={target} alt="Target" />
        Target
      </Button>
      <Button
        className={classes['control-btn']}
        onClick={handleClick}
        data-type="wall"
      >
        <img src={wall} alt="Wall" />
        Wall
      </Button>
      <Button className={classes['control-btn']} onClick={handleClearBoard}>
        Clear Board
      </Button>
      <Button className={classes['control-btn']}>Pattern 1</Button>
      <Button className={classes['control-btn']}>Pattern 2</Button>
      <Button className={classes['control-btn']}>Pattern 3</Button>
      <Button className={classes['control-btn']}>Pattern 4</Button>
    </div>
  );
}

export default Controls;
