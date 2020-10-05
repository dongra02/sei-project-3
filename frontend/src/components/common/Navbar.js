import React from 'react' 
import { Link } from 'react-router-dom'
import Login from './Login'

class Navbar extends React.Component {

  state = {
    loggedIn: true,
    page: 'Found',
    popup: false
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

  popupForm = (event) => {
    const popup = this.state.popup ? false : event.target.innerHTML
    this.setState({ popup })
  }

  render() {

    const { loggedIn, page, popup } = this.state

    return (
      <>
        <nav className="navbar-expand">   
          <div className="navbar-nav">
            <Link to="/quests" className={`nav-link ${page === 'Find' || page === 'quests' ? 'active' : ''}`}   onClick={this.selectNavItem}>Find</Link>
            <Link to="/create" className={`nav-link ${page === 'Create' ? 'active' : ''}`} onClick={this.selectNavItem}>Create</Link>
            <div className="nav-link" onClick={this.popupForm}>Pop-up</div>
          </div>
          <Link to="/" className={`navbar-logo ${page === 'Found' ? 'active' : ''}`} onClick={this.selectNavItem}>Found</Link>
          <div className="navbar-nav user">
            {!loggedIn && <Link to="/register" className="nav-link" >Register</Link>}
            {!loggedIn && <Link to="/login" className="nav-link" >Login</Link>}
            {loggedIn && <Link to="#" className="nav-link" onClick={this.fakeLogin} >Profile</Link>}
          </div>
          <div className={`popup-form ${popup ? 'selected' : ''}`}>
            <div className="form-contents">
              <Login />
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default Navbar
