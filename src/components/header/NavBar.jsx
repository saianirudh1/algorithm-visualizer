import { useDispatch, useSelector } from 'react-redux';

import classes from './NavBar.module.css';
import NavList from './NavList';

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
        <button
          className={type === 'sort' ? classes['btn--selected'] : ''}
          onClick={sortButtonHandler}
        >
          Sorting Algorithms
        </button>

        <button
          className={type === 'path' ? classes['btn--selected'] : ''}
          onClick={pathButtonHandler}
        >
          Path Algorithms
        </button>
        <NavList type={type} />
        <button className={classes['btn--primary']}>Visualize</button>
      </ul>
    </nav>
  );
}

export default NavBar;
