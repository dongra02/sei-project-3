import React from 'react'

const QuestForm = (props) => {
  const { name, location, estTime } = props.questFormData
  const { handleQuestFormChange, themes } = props


  return (
    <>
      <form className="create-form">
        <h6>Quest Details</h6>
        <div className="form-group">
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={handleQuestFormChange}
            placeholder="Give your quest a name"/>
        </div>
        <div className="form-group">
          <input type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={handleQuestFormChange}
            placeholder="City/Location (pick from map???)"/>
        </div>
        <div className="form-group">
          <select className="form-control" id="theme" onChange={handleQuestFormChange}>
            <option value=''>Select a Theme</option>
            {themes.map(theme => 
              <option key={theme} value={theme}>{theme}</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            id="name"
            value={estTime}
            onChange={handleQuestFormChange}
            placeholder="Quest duration (minutes)"/>
        </div>
      </form>
    </>
  )
}

export default QuestForm