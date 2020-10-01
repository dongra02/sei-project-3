import React from 'react'

const Header = ({ isHome }) => {
  return (
    <div className={`header ${isHome ? 'is-home' : ''}`}>
      <div className="header-title">
        302
      </div>
      <img src={require('../../images/trail.png')} />
      <div className="header-title">
        Found
      </div>
    </div>
  )
}

export default Header