import classes from './NavBar.module.css';

function NavBar() {
  return (
    <nav>
      <ul className={classes.navlist}>
        <button>Sorting Algorithms</button>
        <button>Path Algorithms</button>
        <ul className={classes.dropdown}>
          <label className={classes['dropdown--btn']}>
            {`Convergent Swarm Algorithm`}
            <span className={classes.arrow}>{'\u25BC'}</span>
          </label>
          <li className={classes['dropdown--item']}>Algorithms</li>
          <li className={classes['dropdown--item']}>Algorithms</li>
          <li className={classes['dropdown--item']}>Algorithms</li>
          <li className={classes['dropdown--item']}>Algorithms</li>
          <li className={classes['dropdown--item']}>Algorithms</li>
          <li className={classes['dropdown--item']}>Algorithms</li>
          <li className={classes['dropdown--item']}>Algorithms</li>
          <li className={classes['dropdown--item']}>Algorithms</li>
          <li className={classes['dropdown--item']}>Algorithms</li>
          <li
            className={`${classes['dropdown--item']} ${classes['last--item']}`}
          >
            Algorithms
          </li>
        </ul>
        <button className={classes['btn--primary']}>Visualize</button>
      </ul>
    </nav>
  );
}

export default NavBar;
