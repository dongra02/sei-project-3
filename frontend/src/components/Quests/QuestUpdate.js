import React from 'react'
import QuestCreate from './QuestCreate'

const QuestUpdate = (props) => {

  const questId = props.match.params.id
  console.log(questId)

  return (
    <QuestCreate questId={questId} />
  )
}

export default QuestUpdate