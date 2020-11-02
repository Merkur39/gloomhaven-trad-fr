import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from './constants/routes.json'
import App from './components/App'
import Home from './components/Home/Home.component'

const Routes = (): JSX.Element => {
  return (
    <App>
      <Switch>
        <Route path={routes.HOME} component={Home} />
      </Switch>
    </App>
  )
}

export default Routes
