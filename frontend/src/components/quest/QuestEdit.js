import React from 'react'
import QuestCreate from './QuestCreate'
import { getSingleQuest } from '../../lib/api'

class QuestEdit extends React.Component {

  state = {
    questToEdit: null
  }

  componentDidMount = async () => {
    try {
      const questToEditFull = await getSingleQuest(this.props.match.params.id)
      if (!questToEditFull) throw new Error()
      const questToEdit = {
        id: questToEditFull.data.id,
        name: questToEditFull.data.name,
        owner: questToEditFull.data.owner,
        description: questToEditFull.data.description,
        estTime: questToEditFull.data.estTime,
        stops: questToEditFull.data.stops,
        theme: questToEditFull.data.theme,
        timer: questToEditFull.data.timer
      }
      this.setState({ questToEdit })
    } catch (err) {
      console.log(err)
    }
  }

  // TODO redirect to quest page?
  redirect = () => {
    this.props.history.goBack()
  }

  render(){
    const { questToEdit } = this.state

    if (!questToEdit) return null

    return (
      <QuestCreate questToEdit={questToEdit} questId={questToEdit.id} redirect={this.redirect}/>
    )
  }
}

export default QuestEdit