import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import QuestIndex from './components/Quests/QuestIndex'



const App = () => {
  return (
    <BrowserRouter>
      {/* Header */}
      {/* Navbar */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/quests" component={QuestIndex} />
      </Switch>
      {/* Footer */}
    </BrowserRouter>
  )
}

export default App
