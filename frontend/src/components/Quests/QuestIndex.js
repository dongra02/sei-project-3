import React from 'react'
import { Link } from 'react-router-dom'
import { getAllQuests } from '../../lib/api'

import Filter from '../common/Filter'
import Map from '../map/Map'
import BgMap from '../map/BgMap'

class QuestIndex extends React.Component {

  state = {
    formData: {
      theme: 'All',
      sortBy: 'rating'
    },
    allQuests: null,
    results: null,
    flyTo: null
  }

  star = '⭐️'

  bgLatLng = [
    (Math.random() * 180) - 90,
    (Math.random() * 360) - 180
  ]

  componentDidMount = async () => {
    const response = await getAllQuests()
    this.setState({ allQuests: response.data, results: response.data }, this.filterResults)
  }

  // Form input control
  handleChange = event => {
    const formData = {
      ...this.state.formData,
      [event.target.id]: event.target.value
    }
    this.setState({ formData }, this.filterResults)
  }

  filterResults = () => {
    if (!this.state.results) return

    const { theme, sortBy } = this.state.formData
    const results = this.state.results
      .filter(result => result.theme === theme || theme === 'All')
      .sort((a, b) => {
        if (sortBy === 'time') return b.estTime - a.estTime
        if (a.avgRating === 'Not yet rated') return 1
        if (b.avgRating === 'Not yet rated') return -1
        return b.avgRating - a.avgRating
      })
    
    this.setState({ results })
  }

  // Used to filter search results by visible map area
  getBounds = ({ _ne, _sw }) => {
    const bounds = {
      latitude: [_sw.lat, _ne.lat],
      longitude: [_sw.lng, _ne.lng]
    }
    this.filterResultsByBounds(bounds)
  }

  filterResultsByBounds = (bounds) => {
    if (!this.state.allQuests) return
    const results = this.state.allQuests.filter(res => {
      const location = res.stops[0].location
      const inLat = location.latitude > bounds.latitude[0] && location.latitude < bounds.latitude[1]
      const inLng = location.longitude > bounds.longitude[0] && location.longitude < bounds.longitude[1]
      return inLat && inLng
    })
    //   .map(result => {
    //   return { ...result, location: result.location }
    // })
    this.setState({ results })
  }

  flyToQuest = quest => {
    this.selectQuest(quest)
    const { latitude, longitude } = quest.stops[0].location
    const flyTo = { latitude, longitude }
    // Set state and reset flyTo so that same location can be triggered consecutively if requested
    // ie. Click to go to location -> move map -> click location again
    this.setState({ flyTo }, () => this.setState({ flyTo: null }))
  }

  selectQuest = (quest) => {
    const results = this.state.results.map(result => (
      { ...result, selected: result._id === quest._id ? true : false }
    ))
    this.setState({ results })
  }

  startQuest = questId => {
    this.props.history.push(`/quests/${questId}`)
  }

  // Called when a item is clicked in the geocoder component results
  selectLocation = (location, placeDetails) => {
    console.log(location, placeDetails)
    // location.zoom = Math.min(location.zoom + 10, 18)
    // could set the zoom of the map with this, but not quite sure how its measured here yet
    const { latitude, longitude } = location
    const flyTo = { latitude, longitude }
    this.setState({ flyTo }, () => this.setState({ flyTo: null }))
  }

  exitDetailView = () => {
    const results = this.state.results.map(result => (
      { ...result, selected: false }
    ))
    this.setState({ results })
  }

  render() {
    const { formData, results, flyTo } = this.state
    const selected = results ? results.filter(quest => quest.selected)[0] : null
    return (
      <>
        <BgMap latLng={this.bgLatLng} />
        <div className="browse-quests">
          <h3>Find a new Quest</h3>
          <Filter {...formData} handleChange={this.handleChange} selectLocation={this.selectLocation} />
          <div className="results">
            <div className="results-map">
              <Map
                getBounds={this.getBounds}
                results={results}
                startQuest={this.startQuest}
                flyTo={flyTo}
                clickMarker={this.selectQuest}
              />
            </div>
            <div className="results-list">
              {results &&
                <div className="container">
                  {selected
                    ?
                    <div className="quest-details">
                      <div className="detail-name">{selected.name}</div>
                      <div className="detail-owner">by <Link to={`/users/${selected.owner.id}`}>{selected.owner.username}</Link></div>
                      <br />
                      <div className="detail-theme">{selected.theme}</div>
                      <div className="detail-length">{selected.stops.length} stops</div>
                      <div className="detail-time">Est. Time: {selected.estTime} mins</div>
                      <br />
                      <div className="detail-description">{selected.description}</div>
                      <br />
                      <div className="detail-start">{selected.stops[0].name}</div>
                      <br />
                      <div className="detail-button" onClick={this.exitDetailView}>Back</div>
                      <Link className="detail-button" to={`/quests/${selected._id}`}>Begin</Link>
                    </div>
                    :
                    results.map((quest, i) => (
                      <div key={i} className="results-list-item" onClick={() => this.flyToQuest(quest)}>{quest.name}<br />{this.star.repeat(quest.avgRating)}</div>
                    ))
                  }
                </div>}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default QuestIndex