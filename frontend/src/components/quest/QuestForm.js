import React from 'react'

class QuestForm extends React.Component {

  state = {
    errorMessage: ''
  }
  
  validateForm = () => {
    const { name, description, theme, estTime } = this.props.questFormData

    console.log(this.props.questFormData)
    
    let errorMessage = ''
    if (!name) errorMessage = 'please provide a quest name'
    else if (!description) errorMessage = 'please provide a description'
    else if (theme === 'theme') errorMessage = 'please select a theme'
    else if (!estTime) errorMessage = 'please provide a time estimate'
    else if (this.props.stops === 0) errorMessage = 'a quest must have at least one stop'

    this.setState({ errorMessage })

    if (!errorMessage) this.props.handleQuestSubmit()
  }

  render() {

    const { name, description, theme, estTime, timer } = this.props.questFormData
    const { handleQuestFormChange, themes } = this.props
    const { errorMessage } = this.state

    return (
      <>
        <div className="info-tab">
          <h5>Quest Details</h5>
          <div className="quest-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                value={name}
                onChange={handleQuestFormChange}
                placeholder="Quest Name" />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                className="form-control"
                value={description}
                onChange={handleQuestFormChange}
                placeholder="Description" />
            </div>
            <div className="form-group">
              <select className="form-control" name="theme" value={theme} onChange={handleQuestFormChange}>
                <option value='theme'>Theme</option>
                {themes.map(theme =>
                  <option key={theme} value={theme}>{theme}</option>
                )}
              </select>
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                name="estTime"
                value={estTime}
                onChange={handleQuestFormChange}
                placeholder="Est. Duration (minutes)" />
            </div>
            <div className="form-group timer-check">
              <input
                type="checkbox"
                className="form-control"
                name="timer"
                checked={timer}
                onChange={handleQuestFormChange}
              />
              <label style={{ width: '100px' }}>Enable timer</label>
            </div>
          </div>
          <div className="error-message create">
            {errorMessage}
          </div>
        </div>
        <div className="create-button">
          <button onClick={this.validateForm}>Save Quest</button>
        </div>
      </>
    )
  }
}

export default QuestForm