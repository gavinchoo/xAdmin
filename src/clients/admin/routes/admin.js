import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from '../system/login'
import Home from '../system/home'
import '../../../common/ui/styles/index.less'

export default class App extends React.Component {
    previousLocation = this.props.location

    componentWillUpdate(nextProps) {
        console.log(nextProps)
        const {location} = this.props
        // set previousLocation if props.location is not modal
        if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
            this.previousLocation = this.props.location
        }
    }

    render() {
        const {location} = this.props
        const isModal = !!(
          location.state &&
          location.state.modal &&
          this.previousLocation !== location // not initial render
        )
        console.log('isModal : ' + isModal)
        console.log(this.previousLocation)
        return (
          <div>
              <Switch location={isModal ? this.previousLocation : location}>
                  <Route exact path="/login" component={Login}/>
                  <Route path="/" component={Home}/>
                  <Route component={NoMatch}/>
              </Switch>
          </div>
        )
    }
}

const NoMatch = ({location}) => (
  <div>
      <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)