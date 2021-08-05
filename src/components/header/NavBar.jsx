import { useDispatch, useSelector } from 'react-redux';

import NavList from './NavList';
import Button from '../UI/Button';
import classes from './NavBar.module.css';

import { typeActions } from '../../store/type';
import { algorithmActions } from '../../store/algorithm';

function NavBar() {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.type.algoType);

  const sortButtonHandler = function () {
    dispatch(typeActions.setType('sort'));
    dispatch(algorithmActions.resetAlgorithm());
  };

  const pathButtonHandler = function () {
    dispatch(typeActions.setType('path'));
    dispatch(algorithmActions.resetAlgorithm());
  };

  return (
    <nav>
      <ul className={classes.navlist}>
        <Button
          className={type === 'sort' ? classes['btn--selected'] : ''}
          onClick={sortButtonHandler}
        >
          Sorting Algorithms
        </Button>

        <Button
          className={type === 'path' ? classes['btn--selected'] : ''}
          onClick={pathButtonHandler}
        >
          Path Algorithms
        </Button>
        <NavList type={type} />
        <Button className={classes['btn--primary']}>Visualize</Button>
      </ul>
    </nav>
  );
}

export default NavBar;
