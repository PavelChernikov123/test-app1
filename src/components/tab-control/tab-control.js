import React, {Component} from 'react'
import TabItem            from '../tab-item'
import './tab-control.css'

class TabControl extends Component  {
    state = { active:this.props.name }
    onClick = name => {this.setState((state) => ( { active:name } ))}
    
  render ()  {
    const links = this.props.data.map((key) => {
        return (
            <TabItem name={key} key={key} onClick={ () =>  this.onClick(key) } active = {this.state.active === key}></TabItem>
        )
      })
    return <div><ul className="tab d-flex">{links}</ul></div>
  }
}

export default TabControl