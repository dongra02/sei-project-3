import React from 'react'
import QuestCreate from './QuestCreate'

const QuestUpdate = (props) => {

  const questId = props.match.params.id

  return (
    <QuestCreate questId={questId} />
  )
}

export default QuestUpdate