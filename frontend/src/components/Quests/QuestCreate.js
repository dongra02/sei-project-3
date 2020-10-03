import React from 'react'
import Header from '../common/Header'
import QuestForm from './QuestForm'

class QuestCreate extends React.Component{

  state = {
    questFormData: {
      name: '',
      location: '',
      estTime: '',
      theme: '',
      stops: []
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
    }
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
    //get current formData.stops array
    //push submitted stop to array
    //set state in formData.stops to updated array
  }

  render() {

    const { questFormData, stopFormData } = this.state

    return (
      <div className="create-quest">
        <Header />
        <h3>Create a New Quest</h3>
        <div className="create-container">
          <QuestForm
            questFormData={questFormData}
            handleQuestFormChange={this.handleQuestFormChange}
            handleQuestSubmit={this.handleQuestSubmit}
            stopFormData={stopFormData}
            handleStopFormChange={this.handleQuestFormChange}
            handleStopSubmit={this.handleStopSubmit}
            themes={this.themes}
          />
          <div className="create-map">
            <div>This is going to be a map</div>
          </div>
        </div>
        <h3>We could have list of stops added down here</h3>
      </div>
    )
  }
}

export default QuestCreate