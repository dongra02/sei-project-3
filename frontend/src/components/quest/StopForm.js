import React from 'react'

import Geocoder from '../map/Geocoder'

class StopForm extends React.Component {

  state = {
    errorMessage: ''
  }
  
  validateForm = () => {
    const { isTour } = this.props
    const { name, clue, answer, location } = this.props.stopFormData
    
    let errorMessage = ''
    if (!name) errorMessage = 'please provide a stop name'
    else if (!clue && !isTour) errorMessage = 'please provide a clue'
    else if (!clue && isTour) errorMessage = 'please provide a description'
    else if (!answer && !isTour) errorMessage = 'please provide an answer'
    else if (!location.latitude) errorMessage = 'please select a location'

    this.setState({ errorMessage })

    if (!errorMessage) this.props.submitStop()
  }

  render() {
    const { handleChange, selectLocation, geocoderValue, geocoderKey, selectTab, isNew, isTour } = this.props
    const { name, clue, answerType, answer, hint } = this.props.stopFormData
    const { errorMessage } = this.state
  
    return (
      <div className="stop-form">
        <h5>{isNew ? 'New Stop' : 'Edit Stop'}</h5>
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
            placeholder={isTour ? 'Description' : 'Clue'}
            style={{ height: isTour ? '250px' : 'auto' }}
          />
        </div>
        {!isTour && <>
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
              placeholder={answerType === 'Answer' ? 'Answer' : 'Location Leniency (meters)'}
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              id="hint"
              className="form-control"
              value={hint}
              onChange={handleChange}
              placeholder="Hint (optional)" />
          </div>
        </>}
        <div className="form-group">
          <Geocoder key={geocoderKey} selectLocation={selectLocation} initialValue={geocoderValue} />
        </div>
        <div className="error-message create">
          {errorMessage}
        </div>
        <div className="create-button">
          <button onClick={() => selectTab('stops')}>Cancel</button>
          <button onClick={this.validateForm}>Save Stop</button>
        </div>
      </div>
          
    )
  }
}

export default StopForm