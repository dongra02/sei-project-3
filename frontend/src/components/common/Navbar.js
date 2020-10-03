import React from 'react' 
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

  state = {
    loggedIn: true,
    page: 'Home'
  }

  componentDidMount = () => {
    const url = window.location.pathname.replace('/', '')
    if (url) this.setState({ page: url })
  }

  selectNavItem = event => {
    this.setState({ page: event.target.innerHTML })
  }

  fakeLogin = () => {
    this.setState({ loggedIn: !this.state.loggedIn })
  }

  render() {

    const { loggedIn, page } = this.state

    return (
      <nav className="navbar-expand">   
        <div className="navbar-nav">
          <Link to="/"       className={`nav-link ${page === 'Home' ? 'active' : ''}`}   onClick={this.selectNavItem}>Home</Link>
          <Link to="/quests" className={`nav-link ${page === 'Find' ? 'active' : ''}`}   onClick={this.selectNavItem}>Find</Link>
          <Link to="/create" className={`nav-link ${page === 'Create' ? 'active' : ''}`} onClick={this.selectNavItem}>Create</Link>
        </div>
        <div className="navbar-nav user">
          {!loggedIn && <Link to="/register" className="nav-link" >Register</Link>}
          {!loggedIn && <Link to="/login" className="nav-link" >Login</Link>}
          {loggedIn && <Link to="#" className="nav-link" onClick={this.fakeLogin} >Profile</Link>}
        </div>
      </nav>
    )
  }
}

export default Navbar
