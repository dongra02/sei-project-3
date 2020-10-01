import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import QuestIndex from './components/Quests/QuestIndex'



const App = () => {
  return (
    <BrowserRouter>
      {/* Header */}
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/quests" component={QuestIndex} />
        {/* <Route path="/create" component={RouteIndex} />
        <Route path="/register" component={RouteIndex} />
        <Route path="/login" component={RouteIndex} />
        <Route path="/profile" component={RouteIndex} /> */}
      </Switch>
      {/* Footer */}
    </BrowserRouter>
  )
}

export default App
