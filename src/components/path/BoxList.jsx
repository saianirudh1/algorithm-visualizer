import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from './Box';
import Controls from './Controls';

import classes from './BoxList.module.css';
import {
  getGridWithStart,
  getGridWithTarget,
  getGridWithWall,
  getInitialGrid,
} from '../../utils/pathUtils';
import { gridActions } from '../../store/grid';

function BoxList() {
  const animation = false;
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.grid.grid);
  const gridType = useSelector((state) => state.grid.type);

  useEffect(() => {
    dispatch(gridActions.setGrid(getInitialGrid()));
  }, [dispatch]);

  const handleMouseClick = function (row, col) {
    if (animation) {
      return;
    }

    if (gridType === 'start') {
      const newGrid = getGridWithStart(grid, row, col);
      dispatch(gridActions.setGrid(newGrid));
    }

    if (gridType === 'target') {
      const newGrid = getGridWithTarget(grid, row, col);
      dispatch(gridActions.setGrid(newGrid));
    }

    if (gridType === 'wall') {
      const newGrid = getGridWithWall(grid, row, col);
      dispatch(gridActions.setGrid(newGrid));
    }
  };

  const boxes = grid.map((row, rowIndex) => {
    return (
      <div key={rowIndex} style={{ display: 'flex' }}>
        {row.map((box, boxIndex) => {
          const { row, col, isFinish, isStart, isWall } = box;
          return (
            <Box
              key={boxIndex}
              row={row}
              col={col}
              isFinish={isFinish}
              isStart={isStart}
              isWall={isWall}
              onClick={() => handleMouseClick(row, col)}
            />
          );
        })}
      </div>
    );
  });

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
