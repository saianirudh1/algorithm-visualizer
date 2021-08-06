import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Header from './header/Header';
import SortComponent from './sort/SortComponent';
import PathComponent from './path/PathComponent';

function Main() {
  const type = useSelector((state) => state.type.algoType);

  return (
    <Fragment>
      <Header />
      {type === 'sort' ? <SortComponent /> : <PathComponent />}
    </Fragment>
  );
}

export default Main;
