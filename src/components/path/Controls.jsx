import Button from '../UI/Button';
import classes from './Controls.module.css';

function Controls() {
  return (
    <div className={classes.controls}>
      <Button className={classes['control-btn']}>Wall</Button>
      <Button className={classes['control-btn']}>Pattern 1</Button>
      <Button className={classes['control-btn']}>Pattern 2</Button>
      <Button className={classes['control-btn']}>Pattern 3</Button>
      <Button className={classes['control-btn']}>Pattern 4</Button>
    </div>
  );
}

export default Controls;
