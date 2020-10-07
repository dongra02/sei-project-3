import React from 'react'

import Geocoder from '../map/Geocoder'

const StopForm = (props) => {

  const { name, clue, answerType, answer, hint } = props.stopFormData
  const { handleChange, submitStop, selectLocation, geocoderValue, selectTab } = props

  const validateForm = () => {
    const errors = {
      name, clue, answer
    }
    if (!name) errors.name = false
    if (!clue) errors.clue = false
    if (!answer) errors.answer = false

    if (Object.values(errors).every(val => val)) submitStop()
    else console.log(errors)
  }

  return (
    <div className="create-form">
      <h5>New Stop</h5>
      <div className="form-group">
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={handleChange}
          placeholder="Stop Name"
        />
      </div>
      <div className="form-group">
        <textarea
          type="text"
          id="clue"
          className="form-control"
          value={clue}
          onChange={handleChange}
          placeholder="Clue"
        />
      </div>
      <div className="form-group">
        <select className="form-control" id="answerType" value={answerType} onChange={handleChange}>
          <option value='Answer'>Answer</option>
          <option value="Proximity">Proximity</option>
        </select>
      </div>
      <div className="form-group">
        <input
          type={answerType === 'Answer' ? 'text' : 'number'}
          id="answer"
          className="form-control"
          value={answer}
          onChange={handleChange}
          placeholder={answerType === 'Answer' ? 'Answer' : 'Location Leniency'}
        />
      </div>
      <div className="form-group">
        <textarea
          type="text"
          id="hint"
          className="form-control"
          value={hint}
          onChange={handleChange}
          placeholder="Hint (optional)"/>
      </div>
      <div className="form-group">
        <Geocoder selectLocation={selectLocation} initialValue={geocoderValue} />
      </div>
      <div className="create-button">
        <button onClick={() => selectTab({ target: { value: 'stops' } })}>Cancel</button>
        <button onClick={validateForm}>Save Stop</button>
      </div>
    </div>
  )
}

export default StopForm