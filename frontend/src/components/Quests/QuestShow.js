import React from 'react'
import { getSingleQuest } from '../../lib/api'

import Header from '../common/Header'
import Map from '../map/Map'

class QuestShow extends React.Component {
  state = {
    screen: 'map',
    route: null,
    currentStop: 0,
    answer: '',
    flyTo: null,
    lastStop: false
  }

  componentDidMount = async () => {
    const response = await getSingleQuest(this.props.match.params.id)
    this.setState(
      { route: response.data, flyTo: response.data.stops[0].location },
      () => this.setState({ flyTo: null })
    )
  }

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

    if (currentStop + 1 === route.stops.length - 1)  {
      this.setState({ lastStop: true }) 
    }

    if (answer.toLowerCase() === route.stops[currentStop].answer.toLowerCase()) {
      const currentStop = this.state.currentStop + 1
      this.setState({ currentStop })
    }
  }

  // TODO this value can be checked against correct latlng for next stop to trigger a correct guess
  getLocationGuess = guess => {
    const { currentStop, route } = this.state
    const degreeLengthInMeters = 111000
    const nextLocation = route.stops[currentStop + 1].location
    const latDiff = Math.abs(guess.latitude - nextLocation.latitude) * degreeLengthInMeters
    const lngDiff = Math.abs(guess.longitude - nextLocation.longitude) * degreeLengthInMeters
    const length = Math.sqrt(Math.pow(latDiff, 2) + Math.pow(lngDiff, 2))
    console.log(length)
  }

  render() {
    const { screen, route, currentStop, answer, finalStop } = this.state
    const stop = route ? route.stops[currentStop] : null
    return (
      <>
        <Header />
        <div className="show-quests">
          <div className="show-tabs">
            {['map', 'clue', 'comments'].map((tab, i) => (
              <button key={i} value={tab} onClick={this.handleClick} className={`tab ${screen === tab ? '' : 'inactive'}`} >{tab.toUpperCase()}</button>
            ))}
          </div>
          <div className="quest-view">
            <div className="clues" style={{ display: screen === 'clue' ? 'block' : 'none' }}>
              <div>   {/* this is normal content */}
                <h2>{stop ? stop.name : ''}</h2><br />
                <p>Your next clue is:</p>
                <p>{stop ? stop.clue : ''}</p>
                <div className="answer-input">
                  <input
                    type="text"
                    name="answer"
                    value={answer}
                    placeholder="answer"
                    onChange={this.changeAnswer}
                  />
                </div>
                <div className="btn-next">
                  <button onClick={this.nextStop}>{currentStop === 0 ? 'START' : 'NEXT'}</button>
                </div>
              </div>
            </div>
            <div className="show-map" style={{ display: screen === 'map' ? 'block' : 'none' }}>
              <Map flyTo={this.state.flyTo} route={this.state.route} stop={this.state.currentStop} showGuess={this.getLocationGuess} />
            </div>
            <div className="comments" style={{ display: screen === 'comments' ? 'block' : 'none' }}>
              <h2>Comments</h2>
              <p>Other users comments</p>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default QuestShow