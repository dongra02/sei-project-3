import React from 'react'

import Header from '../common/Header'
import QuestShow from './QuestShow'

class QuestIndex extends React.Component {

  state = {
    searchResults: [
      'quest 16345',
      'quest 56434',
      'quest 56424',
      'quest 23754',
      'quest 08655'
    ]
  }

  render() {
    const { searchResults } = this.state
    return (
      <>
        <Header />
        <div className="browse-quests">
          <div className="filters">FILTERS</div>
          <div className="results">
            <div className="results-map">
              MAP
            </div>
            <div className="results-list">
              {searchResults && searchResults.map((quest, i) => <div key={i} className="results-list-item">{quest}</div>)}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default QuestIndex