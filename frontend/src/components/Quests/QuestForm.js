import React from 'react'

const QuestForm = (props) => {
  const { name, description, estTime, timer } = props.questFormData
  const { handleQuestFormChange, handleQuestSubmit, themes } = props


  return (
    <>
      <form className="form-container info-tab">
        <h5>Quest Details</h5>
        <div className="quest-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              value={name}
              onChange={handleQuestFormChange}
              placeholder="Quest Name"/>
          </div>
          <div className="form-group">
            <textarea
              name="description"
              className="form-control"
              value={description}
              onChange={handleQuestFormChange}
              placeholder="Description"/>
          </div>
          <div className="form-group">
            <select className="form-control" name="theme" onChange={handleQuestFormChange}>
              <option value=''>Theme</option>
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
              placeholder="Est. Duration (minutes)"/>
          </div>
          <div className="form-group timer-check">
            <label style={{ width: '100px' }}>Enable timer</label>
            <input
              type="checkbox"
              className="form-control"
              name="timer"
              checked={timer}
              onChange={handleQuestFormChange}
            />
          </div>
        </div>
        <div className="btn-submit-quest">
          <button onClick={handleQuestSubmit}>Save Quest</button>
        </div>
      </form>
    </>
  )
}

export default QuestForm