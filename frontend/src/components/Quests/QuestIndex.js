import React from 'react'
import axios from 'axios'

import Filter from '../common/Filter'
import Map from '../map/Map'

class QuestIndex extends React.Component {

  state = {
    formData: {
      theme: '',
      time: 0
    },
    results: null,
    flyTo: null
  }

  componentDidMount = async () => {
    const response = await axios.get('/api/quests')
    this.setState({ results: response.data })
  }

  // Form input control
  handleChange = event => {
    const formData = {
      ...this.state.formData,
      [event.target.id]: event.target.value
    }
    this.setState({ formData })
  }

  // This will be used to filter search results by visible map area
  getBounds = () => {
    // console.log(bounds)
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

  render() {
    const { formData, results,flyTo } = this.state
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
              <div className="container">
                {results && results.map((quest, i) => (
                  <div key={i} className="results-list-item" onClick={() => this.flyToQuest(quest)}>{quest.name}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default QuestIndex