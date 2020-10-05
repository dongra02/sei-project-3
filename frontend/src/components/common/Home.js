import React from 'react'
import Header from './Header'
import BgMap from '../map/BgMap'

const Home = () => {
  {/* <Header isHome /> */}
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