import React from 'react'

import Header from '../common/Header'
import QuestForm from './QuestForm'
import StopForm from './StopForm'
import StopList from './StopList'
import Map from '../map/Map'

class QuestCreate extends React.Component{

  state = {
    questFormData: {
      name: '',
      location: '',
      estTime: '',
      theme: ''
    },
    stopFormData: {
      name: '',
      clue: '',
      hints: [],
      answer: '',
      location: {
        latitude: '',
        longitude: ''
      }
    },
    stops: [],
    flyTo: null,
  }
  themes = ['Food & Drink', 'Sightseeing', 'Adventure', 'Speed']

  handleQuestFormChange = event => {
    const questFormData = {
      ...this.state.questFormData,
      [event.target.id]: event.target.value
    }
    this.setState({ questFormData })
  }

  handleQuestSubmit = async () => {
    const location = this.state.stops[0].location
    const newQuest = { ...this.state.questFormData, stops: [ ...this.state.stops ], location: location }
    console.log(newQuest)
  }

  handleStopFormChange = event => {
    const stopFormData = {
      ...this.state.stopFormData,
      [event.target.id]: event.target.value
    }
    this.setState({ stopFormData })
  }

  handleStopSubmit = event => {
    event.preventDefault()
    const stops = [ ...this.state.stops ]
    const stopFormData = { ...this.state.stopFormData }
    stops.push(stopFormData)
    this.setState({ stops: [...stops] })
  }

  selectLocation = location => {
    const { latitude, longitude } = location
    const flyTo = { latitude, longitude }
    const stopLocation = { latitude: latitude, longitude: longitude }
    const updateStop = { ...this.state.stopFormData, location: stopLocation }
    this.setState({ flyTo, stopFormData: updateStop }, () => this.setState({ flyTo: null }))
  }

  render() {

    const { questFormData, stopFormData, stops, results, flyTo } = this.state

    return (
      <div className="create-quest">
        <Header />
        <h3>Create a New Quest</h3>
        <QuestForm
          questFormData={questFormData}
          handleQuestFormChange={this.handleQuestFormChange}
          handleQuestSubmit={this.handleQuestSubmit}
          themes={this.themes}
        />
        <div className="create-container">
          <StopForm
            stopFormData={stopFormData}
            handleStopFormChange={this.handleStopFormChange}
            handleQuestionChange={this.handleQuestionChange}
            handleStopSubmit={this.handleStopSubmit}
            selectLocation={this.selectLocation}
          />
          <div className="create-map">
            <Map flyTo={flyTo} getBounds={() => null} />
          </div>
        </div>
        <StopList stops={stops} />
        <button onClick={this.handleQuestSubmit}>Save Quest</button>
      </div>
    )
  }
}

export default QuestCreate