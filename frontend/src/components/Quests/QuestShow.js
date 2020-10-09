import React from 'react'
import { getSingleQuest, updateQuest } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import { Link } from 'react-router-dom'
import Timer from './Timer'

import Map from '../map/Map'

class QuestShow extends React.Component {
  state = {
    screen: 'clue',
    route: null,
    currentStop: 0,
    answer: '',
    flyTo: null,
    lastStop: false,
    time: 0,
    guess: [],
    hasComments: false,
    hasBegun: false,
    addReview: false,
    reviewForm: {
      text: '',
      rating: 5
    }
  }

  componentDidMount = async () => {
    const response = await getSingleQuest(this.props.match.params.id)
    let hasComments
    if (response.data.comments.length > 0) {
      hasComments = true
    }
    this.setState(
      { route: response.data, flyTo: response.data.stops[0].location, hasComments },
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

  updateReview = event => {
    const reviewForm = {
      ...this.state.reviewForm,
      [event.target.name]: event.target.value
    }
    this.setState({ reviewForm })
  }

  submitReview = () => {
    console.log(this.state.reviewForm)
  }

  nextStop = async () => {
    const { route, currentStop, answer } = this.state

    if (answer.toLowerCase() === route.stops[currentStop].answer.toLowerCase()) {
      this.setState({ currentStop: currentStop + 1, answer: '' })

      if (currentStop + 2 >= route.stops.length) {
        if (isAuthenticated) {
          try {
            await updateQuest({ completedTime: this.state.time }, route.id)
          } catch (err) {
            console.log(err)
          }
        } 
        if (!isAuthenticated) {
          console.log('TODO: non authenticated time not added')
        } 
        this.setState({ lastStop: true })
      }
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
    this.setState({ guess: [{ location: guess }] })
  }
  
  updateTime = () => {
    const time = this.state.time + 1
    this.setState({ time })
  }

  toggleReview = () => {
    this.setState({ addReview: !this.state.addReview })
  }

  render() {
    const {
      screen,
      route,
      currentStop,
      answer,
      lastStop,
      hasComments,
      hasBegun,
      addReview,
      flyTo,
      guess,
      reviewForm
    } = this.state
    if (!route) return null //TODO display loading or failed to get
    const stop = route.stops[currentStop]
    // Only show marker for current stop if playing a certain theme
    if (route.theme === 'Adventure' || route.them === 'Speed') {
      route.stops = [route.stops[currentStop]]
    } 
    // else {
    //   route.stops[currentStop].altColor = true
    // }
      
    return (
      <>
        <div className="show-quests">
          <div className="show-tabs">
            {['clue', 'map', 'comments'].map((tab, i) => (
              <button key={i} value={tab} onClick={this.handleClick} className={`tab ${screen === tab ? '' : 'inactive'}`} >{tab.toUpperCase()}</button>
            ))}
          </div>
          <div className="quest-view">
            <div className="clues" style={{ display: screen === 'clue' ? 'block' : 'none' }}>
              { route && !hasBegun && 
                <div className="start-details">
                  <div className="detail-heading">
                    <h2>{route.name}</h2>
                    <div className="detail-user">By {route.owner.username}</div>
                  </div>
                  <div className="detail-theme">{route.theme}</div>
                  <div className="detail-stops">{route.stops.length} stops</div>
                  <div className="detail-time">Est. Time: {route.estTime} mins</div>
                  <div className="detail-firststop">Start at: {stop ? stop.name : ''}</div>
                  <div className="detail-description">{route.description}</div>
                  <button className="newquest-button" onClick={() => this.setState({ hasBegun: true })}>START</button>  
                  { route.timer === true &&
                    <div className="timer">Timer {route.timer}</div>
                  }
                </div>
              }
              { hasBegun && !lastStop &&
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
              { lastStop && !addReview &&
                <div className="endgame">     
                  <div className="detail-heading">
                    <h2>{route.name}</h2>
                    <div className="detail-user">By {route.owner.username}</div>
                  </div>
                  <div><br />Well done, you have completed your quest!<br /></div>
                  <div>Your time was {this.state.time} seconds</div>
                  <hr />
                  <div className="btn-play red"><Link to={'/quests/'}>Choose New Quest</Link></div>
                  {isAuthenticated()
                    ? <div className="btn-play red" onClick={this.toggleReview}>Leave a Review</div>
                    : <div> Login to leave a review!</div>}
                </div>
              }
              {/* REVIEW */}
              {lastStop && addReview && 
                <div className="review-form">
                  <h2>Your review</h2>
                  <textarea className="form-control" name="text" value={reviewForm.text} onChange={this.updateReview}/>
                  <div>Rating</div>
                  <select className="form-control" name="rating" value={reviewForm.rating} onChange={this.updateReview}>
                    {[1, 2, 3, 4, 5].map((val) => <option key={val} value={val}>{val}</option>)}
                  </select>
                  <button className="btn-play red" onClick={this.submitReview}>submit</button>
                  <button className="btn-play red" onClick={this.toggleReview}>cancel</button>
                </div>
              }
            </div>
            {/* MAP */}
            <div className="show-map" style={{ display: screen === 'map' ? 'block' : 'none' }}>
              <Map flyTo={flyTo} route={route} getLocation={this.getLocationGuess} results={guess} />
            </div>
            
            <div className="comments" style={{ display: screen === 'comments' ? 'block' : 'none' }}>
              { hasComments
                ? route.comments.map((comment, i) => <div key={i}>{comment.text}<hr /></div>)         
                : <div>No comments yet.<br />Complete the quest to leave one of your own</div>
              }    
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default QuestShow