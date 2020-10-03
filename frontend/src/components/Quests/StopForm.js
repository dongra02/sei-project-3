import React from 'react'

const StopForm = (props) => {

  const { name, question } = props.stopFormData
  const { clue, answer } = props.stopFormData.question
  const { handleStopFormChange, handleStopSubmit } = props


  return (
    <form className="create-form" onSubmit={handleStopSubmit}>
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
          onChange={handleStopFormChange}
          placeholder="Location - pick from map!!??"/>
      </div>
      <div className="form-group">
        <input
          type="text"
          id="question[clue]"
          className="form-control"
          value={question[clue]}
          onChange={handleStopFormChange}
          placeholder="Clue"/>
      </div>
      <div className="form-group">
        <input
          type="text"
          id="question[answer]"
          className="form-control"
          value={question[answer]}
          onChange={handleStopFormChange}
          placeholder="Answer"/>
      </div>
      <button type="submit">add stop</button>
    </form>
  )
}

export default StopForm