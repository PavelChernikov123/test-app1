import React, {Component} from 'react'
import Item               from '../item/item'
import './grid.css'

const onMoveLeftDefault = () => {}
const onMoveRightDefault = () => {}

export default class Grid extends Component {
    
 setDefaultState =  () => (
   {
    checkedItems: [],
    checkAll: false
  })

static defaultProps = {
  onMoveLeft: onMoveLeftDefault,
  onMoveRight: onMoveRightDefault
}

state = this.setDefaultState()

onCheckAll = e => {
  const checked = e.target.checked;
  checked ?  this.setState((state) => (
               {
                  checkAll: checked,
                  checkedItems: [...this.props.items.map((item)=> (item.id))]
                }
             )) 
          :
             this.setState((state) => (
                 {
                  checkAll: checked,
                  checkedItems: []
                }
             ))
}

onCheck = e => {
  const checked = e.target.checked;
  const id      = e.target.value * 1;

  if(checked === true)
    this.setState((state) => (
      {
        checkedItems: [...state.checkedItems, id],
        checkAll: state.checkedItems.length +1 === this.props.items.length 
      }
    )) 
  else{
    this.setState((state) => {
      const idx = state.checkedItems.findIndex((item) => item === id)
      return {
        checkedItems: [
        ...state.checkedItems.slice(0, idx),
        ...state.checkedItems.slice(idx + 1)
      ],
      checkAll: false
    }
    })
  }
}


render() {
  const { items, keyName , onMoveLeft, onMoveRight } = this.props; 
  
  const onMoveRightGroup = () => {
    onMoveRight(this.state.checkedItems)
    this.setState(() => (this.setDefaultState()) )
  }

  const onMoveLeftGroup = () => {
    onMoveLeft(this.state.checkedItems)
    this.setState(() => (this.setDefaultState()) )
  }

  const getMoveFunc = () => {
    return  {
      onMoveLeft:  onMoveLeft  === onMoveLeftDefault  ? undefined : onMoveLeft,
      onMoveRight: onMoveRight === onMoveRightDefault ? undefined : onMoveRight
    }
  }

  const elements = items.map((item) => {
      
    const { id, ...itemProps } = item;
    const checked = this.state.checkAll || this.state.checkedItems.indexOf(id) > -1
      
    return (
        <div key={id} className="list-group-item">
          <Item
            { ...itemProps }
            { ...getMoveFunc() }
            id      = { id }
            onCheck = { this.onCheck }
            Checked = { checked }
            />
        </div>
    )
  })

  const left = onMoveLeft === onMoveLeftDefault ? null :
    (<button  type="button" onClick={ onMoveLeftGroup }>
      <i className="fa fa-angle-left"></i>
    </button>)

  const right = onMoveRight === onMoveRightDefault ? null :
    (<button  type="button" onClick={ onMoveRightGroup }>
      <i className="fa fa-angle-right"></i>
    </button>)

  const indeterminate = this.state.checkedItems.length !== items.length 
                        && this.state.checkedItems.length !== 0;
  return (
  <div className="col-md-3">
    <div className="row title"><b>{ keyName } Page</b></div>
    <div className="row title ">
        <div className="col-md-1">
          <input type= "checkbox" 
            id            = "checkall"
            checked       = { this.state.checkAll }  
            onChange      = { this.onCheckAll } 
            indeterminate = { this.state.indeterminate }
            ref           = { el => el && (el.indeterminate = indeterminate) }
          />
        </div>
        <div className="col-md-6">Name</div>
        <div className="col-md-4">
          {left}
          {right}
        </div>
      </div>
    <div className="list-group">{ elements }</div>
  </div>
  )
}
}