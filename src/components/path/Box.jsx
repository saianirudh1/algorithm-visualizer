import classes from './Box.module.css';
import target from '../../img/target.svg';
import wall from '../../img/wall.svg';
import start from '../../img/start.svg';

function Box(props) {
  return (
    <div
      className={classes.box}
      onClick={props.onClick}
      id={`box-${props.row}-${props.col}`}
    >
      {props.isFinish ? (
        <img className={classes.logo} src={target} alt="Target Logo" />
      ) : props.isStart ? (
        <img className={classes.logo} src={start} alt="Start Logo" />
      ) : props.isWall ? (
        <img className={classes.logo} src={wall} alt="Wall Logo" />
      ) : (
        ''
      )}
    </div>
  );
}

export default Box;
