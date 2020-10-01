import React from 'react'

import Header from '../common/Header'

class QuestShow extends React.Component {
  state = {
    quest: null
  }

  async componentDidMount(){
    // const questId = this.props.match.params.id
    // const reponse = await getSingleQuest(questId)
    // console.log(this.props)
    // console.log(response.data)

    // this.setState({
    //   quest: response.data
    // })
  }

  render()  {
    // const { quest } = this.state
    return (
      <>
      <Header />
      <div className="show-quests">
        <div className="top-buttons">
            <button classname="top-buttons">View Map</button>
            <button classname="top-buttons">Clue</button>
            <button classname="top-buttons">Comments</button>
        </div>
        <div className="main-show">
          <div className="clues">
            <h2>Clue</h2>
            <h2>Answer Input</h2>
            <button classname="conditional-buttons">START</button>
            <button classname="conditional-buttons">SUBMIT ANSWER</button>
          </div>
          <div className="show-map">
            <h1>Map</h1>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default QuestShow