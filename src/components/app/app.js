import React, { Component }               from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppHeader                          from '../header'
import TabControl                         from '../tab-control'
import Grid                               from '../grid'
import { connect }                        from 'react-redux'
import { withDataService }                from '../hoc'
import { fetchData, onMove }              from '../../actions'
import './app.css'



 class App extends Component {
  componentDidMount() {
    this.props.fetchData()
  }
    onMove = (id, key, direction) => {
      const idx = this.keys().findIndex(item => item === key)
      const to = this.keys()[idx+direction]
      this.props.onMove({ ids : [id], from:key, to}) 
    }

    onMoveGroup = (ids, key, direction) => {
      const idx = this.keys().findIndex(item => item === key)
      const to = this.keys()[idx+direction]
      this.props.onMove({ids, from:key, to})     
  }
    
    
    keys = () => (Object.keys(this.props.data) || [])
    
    render() {
        const data = this.props.data
        if(!data || data.length ===0) return <div>Loadig...</div>;

        const elements = this.keys().map((key, index) => {
            const first = index === 0
            const last = index === this.keys().length -1

            return (
                
                <Grid 
                    onMove={this.onMove}
                    onMoveGroup = {this.onMoveGroup}
                    items= {data[key]}
                    key={key}
                    keyName = {key}
                    first = {first}
                    last = {last}/>
            )
          })

          const routes = this.keys().map((key, index) => {
                const first = index === 0
                const last = index === this.keys().length -1
                
                return <Route path={`/${key}`} exact key={key} render={() => <Grid 
                    onMove={this.onMove}
                    onMoveGroup={this.onMoveGroup}
                    items= {data[key]}
                    key={key}
                    keyName = {key}
                    first = {first}
                    last = {last}/>} />

          })

        
        return  (
        <div>
         <AppHeader/>
          <div className="row">{elements}</div>  
          <Router>
            <div>
                <TabControl data={this.keys()}></TabControl>
                <div className="row">{routes}</div>
            </div> 
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