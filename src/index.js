import { Provider }             from 'react-redux'
import React                    from 'react'
import ReactDom                 from 'react-dom'
import DataService              from './services/data-service'
import { DataServiceProvider }  from './services/data-service-context'
import App                      from './components/app'
import store                    from './dataStore'

const dataService = new DataService()
ReactDom.render(
    <Provider store={ store }>
        <DataServiceProvider value={ dataService }>
            <App />
        </DataServiceProvider>
    </Provider>,    
    document.getElementById('root')
    )