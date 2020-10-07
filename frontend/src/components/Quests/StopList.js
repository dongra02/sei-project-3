import React from 'react'

const StopList = (props) => {
  const { stops, changeTab } = props

  {/* <td>{stop.name}</td>
  <td>{stop.clue}</td>
  <td>{stop.answer}</td>
  <td>{stop.hint}</td> */}

  return (
    <div className="stop-list">

      {stops.map((stop, i) => (
        <div key={i} className="stop-list-item">
          <div>{stop.name}</div>
          <button onClick={() => changeTab({ target: { value: 'addStop', stopNum: i } })}>edit</button>
          <button onClick={() => console.log('TODO delete stop')}>delete</button>
        </div>
      ))}
      <div className="btn-add-stop">
        <button onClick={() => changeTab({ target: { value: 'addStop' } })}>Add Stop</button>
      </div>
    </div>
  )
}

export default StopList