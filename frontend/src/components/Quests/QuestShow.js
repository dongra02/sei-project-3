import React from 'react'
import { getSingleQuest } from '../../lib/api'
import { Link } from 'react-router-dom'
import Timer from './Timer'

import Map from '../map/Map'

class QuestShow extends React.Component {
  state = {
    screen: 'map',
    route: null,
    currentStop: 0,
    answer: '',
    flyTo: null,
    firstStop: true,
    lastStop: false,
    start: '', 
    time: ''
  }

  componentDidMount = async () => {
    const response = await getSingleQuest(this.props.match.params.id)
    this.setState(
      { route: response.data, flyTo: response.data.stops[0].location, start: response.data },
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

    if (currentStop >= 0)  {
      this.setState({ firstStop: false })
    }

    if (currentStop + 1 === route.stops.length - 1)  {
      this.setState({ lastStop: true }) 
    }

    if (answer.toLowerCase() === route.stops[currentStop].answer.toLowerCase()) {
      const currentStop = this.state.currentStop + 1
      this.setState({ currentStop, answer: '' })
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
  // function that saves time to state 
  // set a const to current time + 1
  // use set state to save that
  // pass this function to Timer

  // getCurrentTime = () => {
  //   const time = new Date + 1
  //   this.setState({ time })
  // }


  render() {
    const { screen, route, currentStop, answer, lastStop, firstStop, start } = this.state
    const stop = route ? route.stops[currentStop] : null
    console.log(this.state)
    return (
      <>
        <div className="show-quests">
          <div className="show-tabs">
            {['map', 'clue', 'comments'].map((tab, i) => (
              <button key={i} value={tab} onClick={this.handleClick} className={`tab ${screen === tab ? '' : 'inactive'}`} >{tab.toUpperCase()}</button>
            ))}
          </div>
          <div className="quest-view">
            <div className="clues" style={{ display: screen === 'clue' ? 'block' : 'none' }}>
              { !lastStop && firstStop && start &&
                <div className="start-details">
                  <h2 className="detail-name">{start.name}</h2>
                  <div className="detail-user">By {start.owner.username}</div>
                  <div className="detail-theme">Theme: {start.theme}</div>
                  <div className="detail-firststop">Start at: {stop ? stop.name : ''}</div>
                  <div className="detail-stops">Stops: {start.stops.length}</div>
                  <div className="detail-time">Estimated Time: {start.estTime} mins</div>
                  <button className="newquest-button" onClick={this.nextStop}>START</button>
                </div>
              }
              { !lastStop && !firstStop &&
                <div className="next-clue">
                  <Timer 
                    getCurrentTime={this.getCurrentTime}
                  />
                  <hr />
                  <h2>{stop ? stop.name : ''}</h2><br />
                  <h3>Your next clue is:</h3>
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
                    <button onClick={this.nextStop}>{'NEXT'}</button>
                  </div>
                </div>
              }
              { lastStop && !firstStop &&
                <div className="endgame">
                  <h2>{stop ? stop.name : ''}</h2><br />
                  <h2>Well done, you have completed your quest!</h2>
                  <p>Your time was {this.state.seconds}... minutes</p>
                  <hr />
                  <Link className="newquest-button" to={'/quests/'}>Choose New Quest</Link>
                </div>
              }
            </div>
            <div className="show-map" style={{ display: screen === 'map' ? 'block' : 'none' }}>
              <Map flyTo={this.state.flyTo} route={this.state.route} stop={this.state.currentStop} getLocation={this.getLocationGuess} />
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