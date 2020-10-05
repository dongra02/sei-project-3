import React from 'react' 
import { Link } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

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
          </div>
          <Link to="/" className={`navbar-logo ${page === 'Found' ? 'active' : ''}`} onClick={this.selectNavItem}>Found</Link>
          <div className="navbar-nav user">
            {!loggedIn && <Link to="#" className="nav-link" onClick={this.popupForm}>Register</Link>}
            {!loggedIn && <Link to="#" className="nav-link" onClick={this.popupForm} >Login</Link>}
            {loggedIn && <Link to="#" className="nav-link" onClick={this.fakeLogin} >Profile</Link>}
          </div>
          <div className={`popup-form ${popup ? 'selected' : ''}`}>
            <div className="form-contents">
              <div style={{ display: `${popup === 'Login' ? 'block' : 'none'}` }}>
                <Login hidePopup={this.popupForm} />
              </div>
              <div style={{ display: `${popup === 'Register' ? 'block' : 'none'}` }}>
                <Register hidePopup={this.popupForm} />
              </div>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default Navbar
