import React from 'react'

const Header = ({ isHome }) => {
  return (
    <div className={`header ${isHome ? 'is-home' : ''}`}>
      <img src={require('../../images/trail-red.png')} alt="logo" />
      <div className="header-title">
        Found
      </div>
    </div>
  )
}

export default Header