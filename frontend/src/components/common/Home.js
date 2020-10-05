import React from 'react'
import BgMap from '../map/BgMap'

const Home = () => {
  return (
    <>
      <div className="home-logo">
        <img src={require('../../images/trail-red.png')} alt="" />
        <div className="header-title">Found</div>
      </div>
      <BgMap />
    </>
  )
}

export default Home