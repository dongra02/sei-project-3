import React from 'react'


const QuestForm = (props) => {
  const { name, location, estTime } = props.questFormData
  const { handleChange, themes } = props


  return (
    <form className="create-form">
      <div className="form-group">
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={handleChange}
          placeholder="Give your quest a name"/>
      </div>
      <div className="form-group">
        <input type="text"
          className="form-control"
          id="location"
          value={location}
          onChange={handleChange}
          placeholder="City/Location (pick from map???)"/>
      </div>
      <div className="form-group">
        <select className="form-control" id="theme" onChange={handleChange}>
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
          onChange={handleChange}
          placeholder="Quest duration (minutes)"/>
      </div>
    </form>
  )
}

export default QuestForm