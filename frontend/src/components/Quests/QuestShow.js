import React from 'react'

import Header from '../common/Header'

class QuestShow extends React.Component {
  
  


  render()  {
    // const { quest } = this.state
    return (
      <>
      <Header />
      <div className="show-quests">
        <div className="top-show-buttons">
        <button type="button" className="btn btn-info">VIEW MAP</button>
        <button type="button" className="btn btn-info">CLUE</button>
        <button type="button" className="btn btn-info">COMMENTS</button>
        </div>
        <div className="middle">
          <div className="clues">
            <h2>Clue</h2>
            <p>Here is your clue:</p>
            <p>Text here telling them the clue</p>
            <div className="answer-input">
              <h2>Answer Input</h2>
              <button type="button" className="btn btn-info">START</button>
              <button type="button" className="btn btn-info">SUBMIT ANSWER</button>
            </div>
          </div>
          <div className="show-map">
            <h1>Map</h1>
          </div>
        </div>
      </div>
      </>
    )
  }
}
export default QuestShow