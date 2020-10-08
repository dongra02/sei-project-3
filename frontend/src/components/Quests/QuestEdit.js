import React from 'react'
import QuestCreate from './QuestCreate'
import { getSingleQuest } from '../../lib/api'

class QuestEdit extends React.Component {

  state = {
    questToEdit: null
  }

  componentDidMount = async () => {
    try {
      const questToEdit = await getSingleQuest(this.props.match.params.id)
      if (!questToEdit) throw new Error()
      this.setState({ questToEdit: questToEdit.data })
    } catch (err) {
      console.log(err)
    }
    
  }

  render(){
    const { questToEdit } = this.state

    return (
      <QuestCreate questToEdit={questToEdit}/>
    )
  }
}

export default QuestEdit