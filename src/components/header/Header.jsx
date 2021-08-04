import logo from '../../img/logo.png';
import classes from './Header.module.css';

import NavBar from './NavBar';

function Header() {
  return (
    <header className={classes.header}>
      <img className={classes.logo} src={logo} alt="Logo" />
      <h2>Algorithm Visualizer</h2>
      <NavBar />
    </header>
  );
}

export default Header;
