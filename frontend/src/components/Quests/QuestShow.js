import React from 'react'

import Header from '../common/Header'

import Map from '../map/Map'

class QuestShow extends React.Component {
  state = {
    screen: 'map',

    currentStop: 0
  }


  // Write a function handleClick for the buttons clue and comments that will change the state of window
  // Then in render, return the right state according to which button clicked

  handleClick = event => {
    this.setState({
      screen: event.target.value
    })
  }

  nextStop = () => {
    this.setState({ currentStop: this.currentStop + 1 })
  }


  render() {
    const { screen, currentStop } = this.state
    return (
      <>
        <Header />
        <div className="show-quests">
          <div className="top-show-buttons">
            {/* <button value="map" onClick={this.handleClick} type="button" className="btn btn-primary btn-block">VIEW MAP</button> */}
            <button value="map" onClick={this.handleClick} type="button" className="tabs">MAP</button>
            <button value="clue" onClick={this.handleClick} type="button" className="btn btn-success btn-block">CLUE</button>
            <button value="comments" onClick={this.handleClick} type="button" className="btn btn-warning btn-block">COMMENTS</button>
          </div>
          <div className="quest-view">
            {screen === 'clue' &&
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
                  <button type="button" className="btn btn-success btn-lg" onClick={this.nextStop}>{currentStop === 0 ? 'START' : 'NEXT'}</button>
                </div>
              </div>
            }
            {screen === 'map' &&
              <div className="show-map">
                <Map getBounds={() => null} />
              </div>
            }
          </div>
        </div>
      </>
    )
  }
}
export default QuestShow