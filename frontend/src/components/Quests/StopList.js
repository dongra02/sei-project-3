import React from 'react'

const StopList = (props) => {
  const { stops, changeTab, deleteStop } = props

  return (
    <div className="stop-list">
      {stops.map((stop, i) => (
        <div key={i} className="stop-list-item">
          <div>{stop.name}</div>
          <div className="stop-list-buttons">
            <button onClick={() => changeTab('addStop', i)}>
              <img src={require('../../images/edit.svg')} alt="edit stop"/>
            </button>
            <button onClick={() => deleteStop(i)}>
              <img src={require('../../images/delete.svg')} alt="delete stop"/>
            </button>
          </div>
        </div>
      ))}
      <div className="create-button">
        <button onClick={() => changeTab('addStop')}>Add Stop</button>
      </div>
    </div>
  )
}

export default StopList