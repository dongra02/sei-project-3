import React from 'react'
import Header from '../common/Header'
import QuestForm from './QuestForm'
import questForm from './QuestForm'

class QuestCreate extends React.Component{

  state = {
    step: 1,
    questFormData: {
      name: '',
      location: '',
      estTime: '',
      theme: '',
      stops: []
    }
  }

  // Need to collect quest info (name, location, estTime, theme) update to setState
  // 'form in form' for filling out stop info (name, location: lat, long, clue, answer)
    // grab stops array from state, push new stop, setState.
  // add 'owner' as current user info
  // send questFormData to backend /api/quests
  themes = ['Food & Drink', 'Sightseeing', 'Adventure', 'Speed']

  handleChange = event => {
    const questFormData = {
      ...this.state.questFormData,
      [event.target.id]: event.target.value
    }
    this.setState({ questFormData })
  }

  render() {

    const { questFormData } = this.state

    return (
      <div className="create-quest">
        <Header />
        <h3>Create a New Quest</h3>
        <div className="create-container">
          <QuestForm
            questFormData={questFormData}
            handleChange={this.handleChange}
            themes={this.themes}
          />
          <div className="create-map">
            <div>This is going to be a map</div>
          </div>
        </div>
      </div>
    )
  }
}

export default QuestCreate