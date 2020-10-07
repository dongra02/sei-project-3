import React from 'react'

class Timer extends React.Component {

  state = {
    minutes: 0,
    seconds: 0
  }


  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds } = this.state
      // if (seconds <= 9) {
      //   this.setState(({ seconds }) => ({
      //     seconds: '0' + seconds
      //   }))
      // } 

      if (seconds >= 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds + 1
        }))
      }
      // if statement that checks if seconds reach 59
      if (seconds === 59) {
        this.setState(({ minutes }) => ({
          minutes: minutes + 1,
          seconds: 0
        }))
      }
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