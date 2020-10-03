import React from 'react'
import Header from '../common/Header'

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
  // send questFromData to backend /api/quests
  themes = ['Food & Drink', 'Sightseeing', 'Adventure', 'Speed']

  nextStep = () => {
    const { step } = this.state
    this.setState({ step: step + 1 })
  }

  prevStep = () => {
    const { step } = this.state
    this.setState({ step: step - 1 })
  }


  render() {
    return (
      <>
        <Header />
        <h3>Create a New Quest</h3>
        <div className="create-container">
          <form className="create-form">
            <div className="form-group">
              <input type="text" className="form-control" id="name" placeholder="Give your quest a name"/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="name" placeholder="City/Location (pick from map?)"/>
            </div>
            <div className="form-group">
              <select className="form-control" id="exampleFormControlSelect1">
                <option value=''>Select a Theme</option>
                {this.themes.map(theme => 
                  <option key={theme} value={theme}>{theme}</option>
                )}
              </select>
            </div>
            <div className="form-group">
              <input type="number" className="form-control" id="name" placeholder="Quest duration (minutes)"/>
            </div>
          </form>
          <div className="create-map">
            <div>This is going to be a map</div>
          </div>
        </div>
      </>
    )
  }
}

export default QuestCreate