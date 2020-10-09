import React from 'react'

class Timer extends React.Component {

  state = {
    time: 0,
    seconds: '00',
    minutes: '00'
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      this.setState({ time: this.state.time + 1 })
      this.formatTime()
      // Update parent component
      this.props.updateTime()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  formatTime = () => {
    let { time } = this.state
    let minutes = Math.floor(time / 60)
    if (minutes < 10) minutes = '0' + minutes
    time -= minutes * 60
    let seconds = time
    if (seconds < 10) seconds = '0' + seconds

    this.setState({ seconds, minutes })
  }

  render() {
    const { minutes, seconds } = this.state
    return <div>Time Elapsed<br />{minutes} : {seconds}</div>
  }
}

export default Timer