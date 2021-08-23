import React from 'react';
import './item.css';
const Item = ({ title, onMoveLeft, onMoveRight, first, last }) => {
  
  const left = first ? 'invisible' :'';
  const right = last ? 'invisible' :'';

  return (
    <div className="row">
      <div className="col-md-8">
        <span>{title}</span>
      </div>
      <div className="col-md-4">
        <button className={left} type="button" onClick={onMoveLeft}>
          <i className="fa fa-angle-left"></i>
        </button>

        <button className={right} type="button" onClick={onMoveRight}>
          <i className="fa fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Item;