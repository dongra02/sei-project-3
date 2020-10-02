import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import Register from './components/common/Register'
import QuestIndex from './components/Quests/QuestIndex'
import QuestShow from './components/Quests/QuestShow'


const App = () => {
  return (
    <BrowserRouter>
      {/* Header */}
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/quests/:id" component={QuestShow} />
        <Route path="/quests" component={QuestIndex} />
        {/* <Route path="/create" component={QuestIndex} />
        <Route path="/login" component={QuestIndex} />
        <Route path="/profile" component={QuestIndex} />   */}
        <Route path="/register" component={Register} />
      </Switch>
      {/* Footer */}
    </BrowserRouter>
  )
}

export default App
