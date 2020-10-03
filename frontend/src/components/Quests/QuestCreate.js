import React from 'react'

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
      <form>
        <div className="form-group">
          <label htmlFor="name">Name Your Quest</label>
          <input type="text" className="form-control" id="name" />
        </div>
        <div class="form-group">
          <label htmlFor="exampleFormControlSelect1">Choose a Theme</label>
          <select className="form-control" id="exampleFormControlSelect1">
            {this.themes.map(theme => 
              <option key={theme} value={theme}>{theme}</option>
            )}
          </select>
        </div>
      </form>
    )
  }
}

export default QuestCreate