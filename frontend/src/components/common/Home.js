import React from 'react'
import BgMap from '../map/BgMap'

const Home = () => {
  const bgLatLng = [
    (Math.random() * 180) - 90,
    (Math.random() * 360) - 180
  ]

  return (
    <>
      <div className="home-logo">
        <img src={require('../../images/trail-red.png')} alt="" />
        <div className="header-title">Found</div>
      </div>
      <BgMap latLng={bgLatLng} />
    </>
  )
}

export default Home