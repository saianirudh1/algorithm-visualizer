import { useEffect, useState } from 'react';

import Main from './components/Main';
import MobileView from './components/UI/MobileView';

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 915;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return <div>{width <= breakPoint ? <MobileView /> : <Main />}</div>;
}

export default App;
