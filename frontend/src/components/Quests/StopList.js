import React from 'react'

const StopList = (props) => {
  const { stops, changeTab, deleteStop } = props

  {/* <td>{stop.name}</td>
  <td>{stop.clue}</td>
  <td>{stop.answer}</td>
  <td>{stop.hint}</td> */}

  return (
    <div className="stop-list">

      {stops.map((stop, i) => (
        <div key={i} className="stop-list-item">
          <div>{stop.name}</div>
          <button onClick={() => changeTab('addStop', i)}>edit</button>
          <button onClick={() => deleteStop(i)}>delete</button>
        </div>
      ))}
      <div className="btn-add-stop">
        <button onClick={() => changeTab('addStop')}>Add Stop</button>
      </div>
    </div>
  )
}

export default StopList