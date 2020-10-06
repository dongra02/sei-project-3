import React from 'react' 
import { Link, withRouter } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import { isAuthenticated, logout } from '../../lib/auth'

class Navbar extends React.Component {

  state = {
    page: 'Found',
    popup: false
  }

  componentDidMount = () => {
    const url = window.location.pathname.replace('/', '')
    if (url) this.setState({ page: url })
  }

  componentDidUpdate = () => {
    if (this.state.page.toLowerCase() === 'create' && !isAuthenticated() && this.state.popup !== 'Login') {
      this.setState({ popup: 'Login' })
    }
  }

  selectNavItem = event => {
    this.setState({ page: event.target.innerHTML, popup: false })
  }

  popupForm = (event) => {
    const popup = this.state.popup ? false : event.target.innerHTML
    this.setState({ popup })
  }

  render() {

    const { page, popup } = this.state

    return (
      <>
        <nav className="navbar-expand">   
          <div className="navbar-nav">
            <Link to="/quests" className={`nav-link ${page === 'Find' || page === 'quests' ? 'active' : ''}`}   onClick={this.selectNavItem}>Find</Link>
            <Link to="/create" className={`nav-link ${page === 'Create' ? 'active' : ''}`} onClick={this.selectNavItem}>Create</Link>
            <Link to="/users" className={`nav-link ${page === 'Users' ? 'active' : ''}`} onClick={this.selectNavItem}>Users</Link>
          </div>
          <Link to="/" className={`navbar-logo ${page === 'Found' ? 'active' : ''}`} onClick={this.selectNavItem}>Found</Link>
          <div className="navbar-nav user">
            {!isAuthenticated() && <div className="nav-link" onClick={this.popupForm}>Register</div>}
            {!isAuthenticated() && <div className="nav-link" onClick={this.popupForm} >Login</div>}
            {isAuthenticated() && <Link to="#" className="nav-link" >Profile</Link>}
            {isAuthenticated() && <div className="nav-link" onClick={logout} >Logout</div>}
          </div>
          <div className={`popup-form ${popup ? 'selected' : ''}`}>
            <div className="form-contents">
              <div style={{ display: `${popup === 'Login' ? 'block' : 'none'}` }}>
                <Login hidePopup={page.toLowerCase() === 'create' ? null : this.popupForm} />
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

export default withRouter(Navbar)
