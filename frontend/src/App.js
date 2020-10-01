import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import RouteIndex from './components/Routes/RouteIndex'
import Navbar from './components/common/Navbar'



const App = () => {
  return (
    <BrowserRouter>
      {/* Header */}
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/routes" component={RouteIndex} />
      </Switch>
      {/* Footer */}
    </BrowserRouter>
  )
}

export default App
