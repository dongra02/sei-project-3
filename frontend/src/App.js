import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
<<<<<<< HEAD
import RouteIndex from './components/Routes/RouteIndex'
import Navbar from './components/common/Navbar'
=======
import QuestIndex from './components/Quests/QuestIndex'
>>>>>>> development



const App = () => {
  return (
    <BrowserRouter>
      {/* Header */}
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
<<<<<<< HEAD
        <Route path="/quests" component={RouteIndex} />
        <Route path="/create" component={RouteIndex} />
        <Route path="/register" component={RouteIndex} />
        <Route path="/login" component={RouteIndex} />
        <Route path="/profile" component={RouteIndex} />
=======
        <Route path="/quests" component={QuestIndex} />
>>>>>>> development
      </Switch>
      {/* Footer */}
    </BrowserRouter>
  )
}

export default App
