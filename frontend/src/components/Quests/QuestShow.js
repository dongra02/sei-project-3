import React from 'react'

import Header from '../common/Header'

import Map from '../map/Map'

class QuestShow extends React.Component {
  state = {
    screen: null
  }


  // Write a function handleClick for the buttons clue and comments that will change the state of window
  // Then in render, return the right state according to which button clicked

  handleClick = event => {
    event.preventDefault()
    const buttonClicked = event.target.innerHTML
    console.log(buttonClicked)
    
    this.setState({
      screen: buttonClicked
    })
  }


  render()  {
    return (
      <>
      <Header />
      <div className="show-quests">
        <div className="top-show-buttons">
        <button value="map" onClick={this.handleClick} type="button" className="btn btn-primary btn-block">VIEW MAP</button>
        <button value="clue" onClick={this.handleClick} type="button" className="btn btn-success btn-block">CLUE</button>
        <button value-="comments" onClick={this.handleClick} type="button" className="btn btn-warning btn-block">COMMENTS</button>
        </div>
        <div className="middle">
          <div className="clues">
            <h2>Quest</h2>
            <p>Your next location is:</p>
            <p>Crown Inn Pub</p>
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