import React from 'react'
import axios from 'axios'

import Header from '../common/Header'
import Filter from '../common/Filter'
import Map from '../map/Map'

class QuestIndex extends React.Component {

  state = {
    searchResults: null,
    formData: {
      location: 'under the sea',
      theme: '',
      time: 0
    },
    questLocation: null
  }

  // componentDidMount = () => {
  //   this.generateMarkers()
  // }

  componentDidMount = async () => {
    const response = await axios.get('/api/quests')
    console.log(response.data)
    this.setState({ searchResults: response.data })
  }

  generateMarkers = () => {
    const { searchResults } = this.state
    for (let i = 0; i < 20; i++) {
      const lat = 51 + Math.random()
      const lng = -1 + Math.random()
      searchResults.push({ name: 'questx', lat, lng })
    }

    this.setState({ searchResults })
  }

  handleChange = event => {
    console.log(event.target)
    const formData = {
      ...this.state.formData,
      [event.target.id]: event.target.value
    }

    this.setState({ formData })
  }

  getBounds = bounds => {
    // console.log(bounds)
  }

  flyToQuest = quest => {
    this.setState({ questLocation: quest.stops[0].location })
  }

  render() {
    const { formData, searchResults, questLocation } = this.state
    return (
      <>
        <Header />
        <div className="browse-quests">
          <h3>Find a new Quest</h3>
          <Filter {...formData} handleChange={this.handleChange} />
          <div className="results">
            <div className="results-map">
              <Map getBounds={this.getBounds} searchResults={searchResults} questLocation={questLocation} />
            </div>
            <div className="results-list">
              <div className="container">
                {searchResults && searchResults.map((quest, i) => <div key={i} className="results-list-item" onClick={() => this.flyToQuest(quest)}>{quest.name}</div>)}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default QuestIndex