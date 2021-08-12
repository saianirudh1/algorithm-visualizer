import BoxList from './BoxList';
import classes from './PathComponent.module.css';

function PathComponent() {
  return (
    <main className={classes.path}>
      <BoxList />
    </main>
  );
}

export default PathComponent;
