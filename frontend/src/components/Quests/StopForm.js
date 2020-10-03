import React from 'react'

const StopForm = (props) => {

  const { name, location } = props.stopFormData
  const { clue, answer } = props.stopFormData.question
  const { handleStopFormChange, handleStopSubmit } = props


  return (
    <form className="stop-form">
      <h6>Add A Stop</h6>
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
        <input
          type="text"
          id="location"
          className="form-control"
          value={`${location.latitude}${location.longitude}`}
          onChange={handleStopFormChange}
          placeholder="Location - pick from map!!??"/>
      </div>
      <div className="form-group">
        <input
          type="text"
          id="clue"
          className="form-control"
          value={clue}
          onChange={handleStopFormChange}
          placeholder="Clue"/>
      </div>
      <div className="form-group">
        <input
          type="text"
          id="answer"
          className="form-control"
          value={answer}
          onChange={handleStopFormChange}
          placeholder="Answer"/>
      </div>
    </form>
  )
}

export default StopForm