import React from 'react'

import Header from '../common/Header'
import Filter from '../common/Filter'
import Map from '../map/Map'

class QuestIndex extends React.Component {

  state = {
    searchResults: [],
    formData: {
      location: 'under the sea',
      theme: '',
      time: 0
    }
  }

  componentDidMount = () => {
    this.generateMarkers()
  }

  generateMarkers = () => {
    const { searchResults } = this.state
    for (let i = 0; i < 20; i++) {
      const lat = 51.51 + (Math.random() / 10)
      const lng = 0.13 + (Math.random() / 10)
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
    console.log(quest)
  }

  render() {
    const { formData, searchResults } = this.state
    return (
      <>
        <Header />
        <div className="browse-quests">
          <h3>Find a new Quest</h3>
          <Filter {...formData} handleChange={this.handleChange} />
          <div className="results">
            <div className="results-map">
              <Map getBounds={this.getBounds} searchResults={searchResults} />
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