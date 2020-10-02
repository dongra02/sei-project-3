import React from 'react'
import axios from 'axios'

import Header from '../common/Header'
import Map from '../map/Map'



class QuestShow extends React.Component {
  state = {
    screen: 'map',
    route: null,
    currentStop: 0,
    answer: ''
  }

  id = '5f772851c76e74fc7cb0fc6e'

  componentDidMount = async () => {
    const response = await axios.get(`/api/quests/${this.id}`)
    this.setState({ route: response.data })
  }


  // Write a function handleClick for the buttons clue and comments that will change the state of window
  // Then in render, return the right state according to which button clicked
  handleClick = event => {
    this.setState({
      screen: event.target.value
    })
  }

  changeAnswer = event => {
    this.setState({ answer: event.target.value })
  }

  nextStop = () => {

    const { currentStop, route, answer } = this.state

    if (answer.toLowerCase() === route.stops[currentStop].question.answer.toLowerCase()) {
      const currentStop = this.state.currentStop + 1
      this.setState({ currentStop })
    }
  }


  render() {
    const { screen, route, currentStop, answer } = this.state
    const stop = route ? route.stops[currentStop] : null

    return (
      <>
        <Header />
        <div className="show-quests">
          <div className="top-show-buttons">
            <button value="map" onClick={this.handleClick} type="button" className="btn btn-primary btn-block">VIEW MAP</button>
            <button value="clue" onClick={this.handleClick} type="button" className="btn btn-success btn-block">CLUE</button>
            <button value="comments" onClick={this.handleClick} type="button" className="btn btn-warning btn-block">COMMENTS</button>
          </div>
          <div className="quest-view">
            {screen === 'clue' &&
              <div className="clues">
                <h2>Quest</h2>
                <p>Your next location is:</p>
                <p>{stop.question.clue}</p>
                <div className="answer-input">
                  <input
                    type="text"
                    name="answer"
                    value={answer}
                    onChange={this.changeAnswer}
                  />
                </div>
                <div className="start-button">
                  <button type="button" className="btn btn-success btn-lg" onClick={() => this.nextStop()}>{currentStop === 0 ? 'START' : 'NEXT'}</button>
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
        {screen === 'comments' && 
        <div className="comments">
            <h1>Comments</h1>
              <p>Other user's comments</p>
        </div>
        }
      </>
    )
  }
}
export default QuestShow