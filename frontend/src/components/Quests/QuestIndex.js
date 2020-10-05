import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Filter from '../common/Filter'
import Map from '../map/Map'

class QuestIndex extends React.Component {

  state = {
    formData: {
      theme: '',
      time: 0
    },
    allQuests: null,
    results: null,
    flyTo: null
  }

  componentDidMount = async () => {
    const response = await axios.get('/api/quests')
    this.setState({ allQuests: response.data, results: response.data })
  }

  // Form input control
  handleChange = event => {
    const formData = {
      ...this.state.formData,
      [event.target.id]: event.target.value
    }
    this.setState({ formData })
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
    const results = this.state.allQuests.filter(res => {
      const location = res.stops[0].location
      const inLat = location.latitude > bounds.latitude[0] && location.latitude < bounds.latitude[1]
      const inLng = location.longitude > bounds.longitude[0] && location.longitude < bounds.longitude[1]
      return inLat && inLng
    })
    this.setState({ results })
  }

  flyToQuest = quest => {
    const results = this.state.results.map(result => (
      { ...result, selected: result._id === quest._id ? true : false }
    ))
    const { latitude, longitude } = quest.stops[0].location
    const flyTo = { latitude, longitude }
    // Set state and reset flyTo so that same location can be triggered consecutively if requested
    // ie. Click to go to location -> move map -> click location again
    this.setState({ results, flyTo }, () => this.setState({ flyTo: null }))
  }

  startQuest = questId => {
    this.props.history.push(`/quests/${questId}`)
  }

  // Called when a item is clicked in the geocoder component results
  selectLocation = location => {
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
    console.log(selected)
    return (
      <>
        {/* <Header /> */}
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
              />
            </div>
            <div className="results-list">
              {results &&
                <div className="container">
                  {selected
                    ?
                    <div className="quest-details">
                      <div className="detail-name">{selected.name}</div>
                      <div className="detail-owner">by {selected.owner.username}</div>
                      <br />
                      <div className="detail-theme">{selected.theme}</div>
                      <div className="detail-length">{selected.stops.length} stops</div>
                      <br />
                      <div className="detail-start">{selected.stops[0].name}</div>
                      <br />
                      <Link className="detail-button" to={`/quests/${selected._id}`}>Begin</Link>
                      <div className="detail-button" onClick={this.exitDetailView}>Back</div>
                    </div>
                    :
                    results.map((quest, i) => (
                      <div key={i} className="results-list-item" onClick={() => this.flyToQuest(quest)}>{quest.name}</div>
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