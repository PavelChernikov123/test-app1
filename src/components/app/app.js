import React, { Component }       from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
}                                 from 'react-router-dom'
import AppHeader                  from '../header'
import TabControl                 from '../tab-control'
import Grid                       from '../grid'
import { connect }                from 'react-redux'
import { withDataService }        from '../hoc'
import { fetchData, onMove }      from '../../actions'
import './app.css'

 class App extends Component {
  componentDidMount() {
    this.props.fetchData()
  }
  
  getMoveFunc = (key) => {
    const keys = this.keys()
    const idx = keys.findIndex(item => item === key)
    const isLeft = idx === 0
    const isRight = idx === keys.length - 1
    return  {
      onMoveLeft:  isLeft   ? null : ids => this.props.onMove({from:key, to:keys[idx-1], ids}),
      onMoveRight: isRight  ? null : ids => this.props.onMove({from:key, to:keys[idx+1], ids})
    }
  }
    
    keys = () => (Object.keys(this.props.data) || [])
    
    render() {
        const data = this.props.data
        if(!data || data.length ===0) return <div>Loadig...</div>;
        
        const widgets = this.keys().map((key, index) => {
            return (
                
                <Grid 
                    onMoveLeft={ this.getMoveFunc(key).onMoveLeft}
                    onMoveRight = {this.getMoveFunc(key).onMoveRight}
                    items= {data[key]}
                    key={key}
                    keyName = {key}
                    />
            )
          })

                  
        return  (
        <div>
         <AppHeader/>
          <div className="row">{widgets}</div>  
          <Router>
            <Switch>
                <Route path="/:name" render={({ match: { params: { name } } }) =>
                    <div>
                        <TabControl data={this.keys()}></TabControl>
                        <Grid 
                          onMoveLeft={this.getMoveFunc(name).onMoveLeft}
                          onMoveRight = {this.getMoveFunc(name).onMoveRight}
                          items= {data[name]}
                            key={name}
                            keyName = {name}
                        />
                    </div>
                }/>
                <Redirect to={`/${this.keys()[0]}`} />
            </Switch> 
          </Router>
        </div>
        )
          
      }
}

const mapStateToProps = ({...props}) => ({...props})
const mapDispatchtoProps = (dispatch, { dataService }) =>  (
    {
        fetchData: fetchData(dataService, dispatch),
        onMove: props => dispatch(onMove(props))
    }
)

export default withDataService()(
  connect(mapStateToProps, mapDispatchtoProps)(App)
  )