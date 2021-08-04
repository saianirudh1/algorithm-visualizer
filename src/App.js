import Header from './components/header/Header';
import MobileView from './components/UI/MobileView';

import classes from './App.module.css';

function App() {
  return (
    <div className={classes.app}>
      <Header />
      {/* <MobileView /> */}
    </div>
  );
}

export default App;
