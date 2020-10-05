import React from 'react'

import Geocoder from '../map/Geocoder'

const StopForm = (props) => {

  const { name, clue, answer, hint, answerType } = props.stopFormData
  const { handleStopFormChange, handleStopSubmit, selectLocation, handleStopAnswerTypeChange, displayAnswerType } = props


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
          placeholder="Stop Name"
          required/>
      </div>
      <div className="form-group">
        <textarea
          type="text"
          id="clue"
          className="form-control"
          value={clue}
          onChange={handleStopFormChange}
          placeholder="Clue"
          required/>
      </div>
      <div className="form-group">
        <select className="form-control" onChange={handleStopAnswerTypeChange}>
          <option value='Answer'>Answer</option>
          <option value="Proximity">Proximity</option>
        </select>
      </div>
      {displayAnswerType() &&  
      <div className="form-group">
        <textarea
          type="text"
          id="answer"
          className="form-control"
          value={answer}
          onChange={handleStopFormChange}
          placeholder="Answer"
          required/>
      </div>}
      {!displayAnswerType() &&  <div className="form-group">
        <input
          type="number"
          id="answer"
          className="form-control"
          value={answer}
          onChange={handleStopFormChange}
          placeholder="Location Leniency"
          required/>
      </div>}
      <div className="form-group">
        <textarea
          type="text"
          id="hint"
          className="form-control"
          value={hint}
          onChange={handleStopFormChange}
          placeholder="Hint (optional)"/>
      </div>
      <div className="form-group">
        <label htmlFor="location">Location :</label>
        <Geocoder selectLocation={selectLocation} required/>
      </div>
      <button type="submit">Add Stop</button>
    </form>
  )
}

export default StopForm