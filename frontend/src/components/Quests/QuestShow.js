import React from 'react'
import { getSingleQuest, updateQuest, submitReview } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import { Link } from 'react-router-dom'
import Timer from './Timer'

import Map from '../map/Map'

class QuestShow extends React.Component {
  state = {
    screen: 'quest',
    route: null,
    currentStop: 0,
    answer: '',
    flyTo: null,
    lastStop: false,
    time: 0,
    guess: [],
    hasBegun: false,
    addReview: false,
    reviewForm: {
      text: '',
      rating: 5
    }
  }

  componentDidMount = async () => {
    const response = await getSingleQuest(this.props.match.params.id)
    console.log(response)
    this.setState(
      { route: response.data, flyTo: response.data.stops[0].location },
      () => this.setState({ flyTo: null })
    )
  }

  changeTab = screen => {
    this.setState({ screen })
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

  submitReview = async () => {
    console.log(this.state.reviewForm)
    try {
      const response = await submitReview(this.state.reviewForm, this.state.route.id)
      this.setState({ route: response.data },
        this.changeTab('reviews'))
    } catch (err) {
      console.log(err)
    }
  }

  nextStop = async () => {
    const { route, currentStop, answer } = this.state

    // Correct answer
    const correctAnswer = answer.toLowerCase() === route.stops[currentStop].answer.toLowerCase()
    const answerNeeded = route.theme === 'Adventure' || route.theme === 'Speed'

    if (correctAnswer || !answerNeeded) {
      this.setState({ currentStop: currentStop + 1, answer: '' })
      // Last stop reached
      if (currentStop + 2 >= route.stops.length) {
        // Save time
        try { //TODO properly implement this on backend - allow anonymous times?
          await updateQuest({ completedTime: this.state.time }, route.id)
        } catch (err) {
          console.log('not authenticated to save time')
        }
        this.setState({ lastStop: true })
      }
    // Incorrect asnwer 
    } else {
      // TODO redo this properly - Very bad solution currently!
      this.setState({ answer: 'Incorrect! Try again' },
        () => setTimeout(() => this.setState({ answer: '' }),1500)
      )
    }
  }

  // TODO this value can be checked against correct latlng for next stop to trigger a correct guess
  getLocationGuess = guess => {
    const { currentStop, route } = this.state
    if (!route.stops[currentStop + 1]) return
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
      hasBegun,
      addReview,
      flyTo,
      guess,
      reviewForm
    } = this.state
    if (!route) return null //TODO display loading or failed to get
    const stop = route.stops[currentStop]
    // Only show marker for current stop if playing a certain theme
    const showAll = route.theme === 'Sightseeing' || route.theme === 'Food & Drink'
      ? true : false
    if (!showAll) {
      route.stops = route.stops //[route.stops[currentStop]]
    } else if (!lastStop) {
      route.stops = route.stops.map((stop, i) => {
        stop.altColor = i === currentStop ? true : false
        return stop
      })
    }
      
    return (
      <>
        <div className="show-quests">
          <div className="show-tabs">
            {['quest', 'map', 'reviews'].map((tab, i) => (
              <button key={i} value={tab} onClick={() => this.changeTab(tab)} className={`tab ${screen === tab ? '' : 'inactive'}`} >{tab.toUpperCase()}</button>
            ))}
          </div>
          <div className="quest-view">
            <div className="clues" style={{ display: screen === 'quest' ? 'block' : 'none' }}>
              { route && !hasBegun && 
                <div className="start-details">
                  <div className="detail-heading">
                    <h2>{route.name}</h2>
                    <div className="detail-user">By <Link to={`/users/${route.owner.id}`}>{route.owner.username}</Link></div>
                  </div>
                  <div className="detail-theme">{route.theme}</div>
                  <div className="detail-stops">{route.stops.length} stops</div>
                  <div className="detail-time">Est. Time: {Math.floor(route.estTime)} mins</div>
                  <div className="detail-firststop">Start at: {stop ? stop.name : ''}</div>
                  <div className="detail-description">{route.description}</div>
                  <button className="btn-play red" onClick={() => this.setState({ hasBegun: true })}>START</button>  
                </div>
              }
              { hasBegun && !lastStop &&
                <div className="next-clue">
                  <div style={{ display: route.timer ? 'block' : 'none' }}>
                    <Timer updateTime={this.updateTime} /><hr />
                  </div>
                  <h2>{stop ? stop.name : ''}</h2><br />
                  <p>{stop ? stop.clue : ''}</p>
                  <div className="answer-input">
                    {!showAll &&
                        <input
                          type="text"
                          name="answer"
                          value={answer}
                          placeholder="answer"
                          onChange={this.changeAnswer}
                        />
                    }
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
                    <div className="detail-user">By <Link to={`/users/${route.owner.id}`}>{route.owner.username}</Link></div>
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
            
            <div className="reviews" style={{ display: screen === 'reviews' ? 'block' : 'none' }}>
              { route.reviews.length > 0
                ? route.reviews.map((review, i) => (
                  <div key={i} className='comment-style'>
                    <span><Link to={`/users/${review.owner.id}`}>{review.owner.username}</Link>: {review.text}</span>
                    <span>{review.rating}</span><hr />
                  </div>))                
                : <h4>No reviews yet.<br />Complete the quest to leave one of your own</h4>
              }    
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default QuestShow