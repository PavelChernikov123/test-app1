import React, {Component} from 'react'
import './item.css';

const onMoveLeftDefault  = () => {}
const onMoveRightDefault = () => {}

class Item extends Component {
  static defaultProps = {
    onMoveLeft: onMoveLeftDefault,
    onMoveRight: onMoveRightDefault
  }
  
  render() {
    const { id, title, onMoveLeft, onMoveRight, onCheck, Checked } = this.props

    const left = onMoveLeft === onMoveLeftDefault ? null :
    (<button  type="button" onClick={ () => onMoveLeft([id]) }>
      <i className="fa fa-angle-left"></i>
    </button>);

    const right = onMoveRight === onMoveRightDefault ? null :
    (<button  type="button" onClick={ () => onMoveRight([id]) }>
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
    )
  }
}

export default Item;