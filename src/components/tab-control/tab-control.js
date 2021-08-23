import React, {Component} from 'react';
import TabItem from '../tab-item';
import './tab-control.css';

class TabControl extends Component  {
    state = {data:[...this.props.data]}
    onClick = () => {
        this.setState((state) => {return  {data:[...this.props.data]}});
    }
    
  render ()  {
    const links = this.state.data.map((key, index) => {

        return (
            <TabItem name={key} key={key} onClick={this.onClick}></TabItem>
        );

      });
    return <div><ul className="tab d-flex">{links}</ul></div>;
  }
}

export default TabControl;