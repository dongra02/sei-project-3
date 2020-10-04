import React from 'react'

const StopList = (props) => {
  const { stops } = props

  return (
    <div className="stop-list">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Stop #</th>
            <th scope="col">Name</th>
            <th scope="col">Clue</th>
            <th scope="col">Answer</th>
          </tr>
        </thead>
        <tbody>
          {stops.map((stop, i) => 
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{stop.name}</td>
              <td>{stop.question.clue}</td>
              <td>{stop.question.answer}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default StopList