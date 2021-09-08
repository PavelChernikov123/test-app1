import React from 'react';
import './item.css';

const onMoveLeftDefault = null
const onMoveRightDefault = null

const Item = ({ id, title, onMoveLeft, onMoveRight, onCheck, Checked }) => {
  
  const left = onMoveLeft === onMoveLeftDefault ? null :
  (<button  type="button" onClick={onMoveLeft}>
    <i className="fa fa-angle-left"></i>
  </button>);

  const right = onMoveRight === onMoveRightDefault ? null :
  (<button  type="button" onClick={onMoveRight}>
    <i className="fa fa-angle-right"></i>
  </button>);

  return (
    <div className="row">
      <div className="col-md-1"><input type="checkbox" value={id} checked={Checked} onChange={onCheck}/></div>
      <div className="col-md-6">
        <span>{title}</span>
      </div>
      <div className="col-md-4">
        {left}
        {right}
      </div>
    </div>
  );
};

export default Item;