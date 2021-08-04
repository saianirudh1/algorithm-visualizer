import classes from './MobileView.module.css';
import logo from '../../img/logo.png';

function MobileView() {
  return (
    <div className={classes.mobile}>
      <img src={logo} alt="Logo" />
      <div className={classes.content}>
        <h1>Open in Desktop to view the app!</h1>
        <p>Too Lazy to style for mobile 😂😬</p>
      </div>
    </div>
  );
}

export default MobileView;
