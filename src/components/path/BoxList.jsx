import Box from './Box';
import Controls from './Controls';

import classes from './BoxList.module.css';
import { getBoxes } from '../../utils/pathUtils';

function BoxList() {
  const arr = getBoxes();
  const boxes = arr.map((item) => <Box key={`${item[0]}-${item[1]}`} />);

  return (
    <section className={classes['path-content']}>
      <Controls />
      <div className={classes['box-list']} id="#path-main">
        {boxes}
      </div>
    </section>
  );
}

export default BoxList;
