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
  }

  render()  {
    return (
      <>
      <Header />
      <div>Show</div>\
      </>
    )
  }
}

export default QuestShow