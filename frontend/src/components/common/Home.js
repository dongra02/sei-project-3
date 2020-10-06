import React from 'react'
import BgMap from '../map/BgMap'

class Home extends React.Component {

  state = {
    bgLatLng: [
      (Math.random() * 180) - 90,
      (Math.random() * 360) - 180
    ]
  }

  componentDidMount = () => {
    setInterval(() => {
      let lat = this.state.bgLatLng[0] - 0.005
      if (lat < -90) lat += 180
      if (lat > 90) lat -= 180
      let lng = this.state.bgLatLng[1] + 0.01
      if (lng < -180) lng += 360
      if (lng > 180) lng -= 360
      
      this.setState({ bgLatLng: [lat, lng] })
    }, 50)
  }

  render() {
    return (
      <>
        <div className="home-logo">
          <img src={require('../../images/trail-red.png')} alt="" />
          <div className="header-title">Found</div>
        </div>
        <BgMap latLng={this.state.bgLatLng} />
      </>
    )
  }
}

export default Home