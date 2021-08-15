import { useDispatch, useSelector } from 'react-redux';

import NavList from './NavList';
import Button from '../UI/Button';
import classes from './NavBar.module.css';

import { getCopy } from '../../utils/pathUtils';
import { algoMap } from '../../constants/appConstants';

import { typeActions } from '../../store/type';
import { algorithmActions } from '../../store/algorithm';
import { inputActions } from '../../store/input';
import { arrayActions } from '../../store/array';

function NavBar() {
  const dispatch = useDispatch();
  const isDisabled = useSelector((state) => state.input.visualize);
  const type = useSelector((state) => state.type.algoType);
  const algorithmState = useSelector((state) => state.algorithm);
  const arrayState = useSelector((state) => state.array.arr);
  const gridState = useSelector((state) => state.grid);
  const navIsDisabled = useSelector((state) => state.input.nav);

  const sortButtonHandler = function () {
    dispatch(typeActions.setType('sort'));
    dispatch(algorithmActions.resetAlgorithm());
  };

  const pathButtonHandler = function () {
    dispatch(typeActions.setType('path'));
    dispatch(algorithmActions.resetAlgorithm());
  };

  const enableVisualize = function () {
    dispatch(inputActions.setVisualize(false));
  };

  const visualizationHandler = async function () {
    const algoFunction = algoMap.get(algorithmState.id);
    dispatch(inputActions.setVisualize(true));
    dispatch(inputActions.setNav(true));

    if (type === 'sort') {
      dispatch(inputActions.setGenerate(true));
      const arr = arrayState.slice();
      const sorted = await algoFunction(arr);
      dispatch(inputActions.setGenerate(false));
      if (algorithmState.id === 's1' || algorithmState.id === 's2') {
        dispatch(arrayActions.setArray(sorted));
      }
    } else {
      dispatch(inputActions.setControl(true));
      const grid = getCopy(gridState.grid.slice());
      await algoFunction(grid);
      dispatch(inputActions.setControl(false));
    }
    dispatch(inputActions.setVisualize(false));
    dispatch(inputActions.setNav(false));
  };

  return (
    <nav>
      <ul className={classes.navlist}>
        <Button
          className={type === 'path' ? classes['btn--selected'] : ''}
          onClick={pathButtonHandler}
          isDisabled={navIsDisabled}
        >
          Path Algorithms
        </Button>
        <Button
          className={type === 'sort' ? classes['btn--selected'] : ''}
          onClick={sortButtonHandler}
          isDisabled={navIsDisabled}
        >
          Sorting Algorithms
        </Button>
        <NavList type={type} enableVisualize={enableVisualize} />
        <Button
          className={classes['btn--primary']}
          onClick={visualizationHandler}
          isDisabled={isDisabled}
        >
          Visualize
        </Button>
      </ul>
    </nav>
  );
}

export default NavBar;
