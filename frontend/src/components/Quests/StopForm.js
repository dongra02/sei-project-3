import React from 'react'

import Geocoder from '../map/Geocoder'

const StopForm = (props) => {

  const { name, clue, answer } = props.stopFormData
  const { handleStopFormChange, handleStopSubmit, handleQuestionChange, selectLocation } = props


  return (
    <form className="create-form" onSubmit={handleStopSubmit}>
      <h5>Add A Stop</h5>
      <div className="form-group">
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={handleStopFormChange}
          placeholder="Stop Name"/>
      </div>
      <div className="form-group">
      <div className="filter-option">
        <label htmlFor="location">Location :</label>
        <Geocoder selectLocation={selectLocation} />
      </div>
      </div>
      <div className="form-group">
        <input
          type="text"
          id="clue"
          className="form-control"
          value={clue}
          onChange={handleQuestionChange}
          placeholder="Clue"/>
      </div>
      <div className="form-group">
        <input
          type="text"
          id="answer"
          className="form-control"
          value={answer}
          onChange={handleQuestionChange}
          placeholder="Answer"/>
      </div>
      <button type="submit">add stop</button>
    </form>
  )
}

export default StopForm