import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DataService from '../../services/data-service';
import AppHeader from '../header';
import TabControl from '../tab-control';
import Grid from '../grid';


import './app.css';


export default class App extends Component {
    dataService = new DataService();
    
    state = this.dataService.getData();

    onMove = (id, key, direction) => {
        let currentItem;

        this.setState((state) => {
            const idx = state[key].findIndex((item) => item.id === id);
            currentItem = state[key][idx];

            const items = [
              ...state[key].slice(0, idx),
              ...state[key].slice(idx + 1)
            ];

            const destination = this.keys[this.keys.findIndex((item) => item === key) + direction];
            
            return { [`${key}`] : items , [`${destination}`]: [...state[destination], currentItem]};
          });    
    };
    
    
    keys = Object.keys(this.state);
    
    render() {
        
        const elements = this.keys.map((key, index) => {
            const first = index === 0;
            const last = index === this.keys.length -1;

            return (
                
                <Grid 
                    onMove={this.onMove}
                    items= {this.state[key]}
                    key={key}
                    keyName = {key}
                    first = {first}
                    last = {last}/>
            );
          });

          const routes = this.keys.map((key, index) => {
                const first = index === 0;
                const last = index === this.keys.length -1;
                
                return <Route path={`/${key}`} key={key} render={() => <Grid 
                    onMove={this.onMove}
                    items= {this.state[key]}
                    key={key}
                    keyName = {key}
                    first = {first}
                    last = {last}/>} />

          });


        return  (
        <div>
         <AppHeader/>
          <div className="row">{elements}</div>  
          <Router>
            <div>
                <TabControl data={this.keys}></TabControl>
                <div className="row">{routes}</div>
            </div> 
          </Router>
        </div>
        );
          
      };
}