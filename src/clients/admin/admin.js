import React from 'react'
import ReactDom from 'react-dom'
import {HashRouter as Router, Route} from 'react-router-dom'
import Admin from './routes/admin'
import {Provider} from 'react-redux'
import Store from './model'
ReactDom.render(
  (<Provider store={Store}>
        <Router>
            <Route component={Admin}/>
        </Router>
    </Provider>
  )
  , document.getElementById('root')
)