import React from 'react'

class Timer extends React.Component {

  state = {
    minutes: 0,
    seconds: 0
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      this.setState(({ seconds, minutes }) => ({
        seconds: seconds + 1,
        minutes: Math.floor(seconds / 60)
      }))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
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