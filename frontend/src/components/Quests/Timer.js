import React from 'react'

class Timer extends React.Component {

  state = {
    minutes: 0,
    seconds: 0
  }


  componentDidMount() {
    this.myInterval = setInterval(() => {
      this.setState(({ seconds }) => ({
        seconds: seconds + 1
      }))
    }, 1000)
  }

  render() {
    const { minutes, seconds } = this.state
    return (
      <div>
        <div>Time Elapsed: { minutes }:{ seconds }</div>
      </div>
    )
  }
}

export default Timer