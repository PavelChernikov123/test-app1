import React from 'react';

import Item from '../item/item';
import './grid.css';

const Grid = ({ items, keyName , onMove, first, last }) => {
    const elements = items.map((item) => {
      const { id, ...itemProps } = item;
      const onMoveLeft = () => {onMove(id, keyName, -1)};
      const onMoveRight = () => {onMove(id, keyName, 1)};
      return (
          <div key={id} className="list-group-item">
            <Item
              { ...itemProps }
              onMoveLeft={ onMoveLeft  }
              onMoveRight={ onMoveRight }
              first={first}
              last = {last}
              />
          </div>
      );
  });

  return (
  <div className="col-md-3">
    <div className="row title"><b>{keyName} Page</b></div>
    <div className="list-group">{ elements }</div>
  </div>
  );
};

export default Grid;