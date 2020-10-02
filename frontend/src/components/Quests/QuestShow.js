import React from 'react'

import Header from '../common/Header'

import Map from '../map/Map'

class QuestShow extends React.Component {
  

  render()  {
    return (
      <>
      <Header />
      <div className="show-quests">
        <div className="top-show-buttons">
        <button type="button" className="btn btn-primary btn-block">VIEW MAP</button>
        <button type="button" className="btn btn-success btn-block">CLUE</button>
        <button type="button" className="btn btn-warning btn-block">COMMENTS</button>
        </div>
        <div className="middle">
          <div className="clues">
            <h2>Clue</h2>
            <p>Here is your clue:</p>
            <p>Text here telling them the clue</p>
            <div className="answer-input">
              {/* <h2>Answer Input</h2> */}
              <input>
              </input>
              <button type="button" className="btn btn-info">SUBMIT ANSWER</button>
            </div>
            <div className="start-button">
            <button type="button" className="btn btn-success btn-lg">START</button>
            <button type="button" className="btn btn-danger btn-lg">GO TO NEXT STAGE</button>
            </div>
          </div>
          <div className="show-map">
            <Map />
          </div>
        </div>
      </div>
      </>
    )
  }
}
export default QuestShow