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
    time: 0,
    markers: [],
    hasComments: false
  }

  componentDidMount = async () => {
    const response = await getSingleQuest(this.props.match.params.id)
    let hasComments
    if (response.data.comments.length > 0) {
      hasComments = true
    }
    this.setState(
      { route: response.data, flyTo: response.data.stops[0].location, start: response.data, hasComments },
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

    if (answer.toLowerCase() === route.stops[currentStop].answer.toLowerCase()) {
      const currentStop = this.state.currentStop + 1
      this.setState({ currentStop, answer: '' })
    } 

    if (currentStop >= 0)  {
      this.setState({ firstStop: false })
    }

    if (currentStop + 1 === route.stops.length - 1)  {
      this.setState({ lastStop: true }) 
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
    this.setState({ markers: [{ location: guess }] })
  }
  
  updateTime = () => {
    const time = this.state.time + 1
    this.setState({ time })
  }

  render() {
    const { screen, route, currentStop, answer, lastStop, firstStop, start, hasComments } = this.state
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
                  <div className="detail-description">Description: {start.description}</div>
                  <div className="detail-stops">Stops: {start.stops.length}</div>
                  <div className="detail-time">Estimated Time: {start.estTime} mins</div>
                  <button className="newquest-button" onClick={this.nextStop}>START</button>  
                  { start.timer === true &&
                    <div className="timer">Timer {start.timer}</div>
                  }
                </div>
              }
              { !lastStop && !firstStop && 
                <div className="next-clue">
                  <Timer updateTime={this.updateTime} />
                  <hr />
                  <h2>{stop ? stop.name : ''}</h2><br />
                  <h3>Clue for next stop:</h3>
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
                    <button onClick={this.nextStop}>NEXT</button>
                  </div>
                </div>
              }
              { lastStop && !firstStop &&
                <div className="endgame">     
                  <hr />
                  <h2>{stop ? stop.name : ''}</h2><br />
                  <h3>Well done, you have completed your quest!</h3>
                  <h5>Your time was {this.state.time} seconds</h5>
                  <hr />
                  <Link className="newquest-button" to={'/quests/'}>Choose New Quest</Link>
                  <h6>Login to leave a review!</h6>
                </div>
              }
            </div>
            <div className="show-map" style={{ display: screen === 'map' ? 'block' : 'none' }}>
              <Map flyTo={this.state.flyTo} route={this.state.route} stop={this.state.currentStop} getLocation={this.getLocationGuess} results={this.state.markers} />
            </div>
            
            <div className="comments" style={{ display: screen === 'comments' ? 'block' : 'none' }}>
              <h2>Reviews</h2>
              <hr />
              <div>
                { hasComments &&
                  start.comments.map(comment => comment.text)          
                }           
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default QuestShow