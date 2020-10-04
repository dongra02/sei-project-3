import React from 'react'

import Header from '../common/Header'
import QuestForm from './QuestForm'
import StopForm from './StopForm'
import StopList from './StopList'

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
      question: {
        clue: '',
        answer: ''
      },
      location: {
        latitude: '',
        longitude: ''
      }
    },
    stops: []
  }
  themes = ['Food & Drink', 'Sightseeing', 'Adventure', 'Speed']

  handleQuestFormChange = event => {
    const questFormData = {
      ...this.state.questFormData,
      [event.target.id]: event.target.value
    }
    this.setState({ questFormData })
  }

  handleQuestSubmit = async event => {
    //set object with formdata as new quest
    //send quest object to backend with post
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
    const stops = this.state.stops
    const stopFormData = this.state.stopFormData
    stops.push(stopFormData)
    this.setState({ stops })
  }

  render() {

    const { questFormData, stopFormData, stops } = this.state

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
            handleStopSubmit={this.handleStopSubmit}
          />
          <div className="create-map">
            <div>This is going to be a map</div>
          </div>
        </div>
        <StopList stops={stops} />
      </div>
    )
  }
}

export default QuestCreate