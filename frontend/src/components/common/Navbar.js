import React from 'react' 
import { Link, withRouter } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import { isAuthenticated, logout } from '../../lib/auth'

class Navbar extends React.Component {

  state = {
    page: 'popquest',
    popup: false,
    toast: false
  }

  componentDidMount = () => {
    // Get correct screen for navbar highlighting
    let page = window.location.pathname.replace('/', '')
    if (!page) page = 'popquest'
    this.setState({ page })
  }

  componentDidUpdate = () => {
    if (this.state.page === 'create' && !isAuthenticated() &&
      (this.state.popup !== 'Login' && this.state.popup !== 'Register')) {
      this.setState({ popup: 'Login' })
    }
  }

  selectNavItem = page => {
    this.setState({ page, popup: false })
  }

  popupForm = (form, message) => {
    const popup = this.state.popup ? false : form
    this.setState({ popup })
    if (message) this.toastNotification(message)
  }

  logoutUser = () => {
    logout()
    const page = this.state.page === 'profile' ? 'found' : this.state.page
    this.setState({ page })
    this.toastNotification('See you next time')
    this.props.history.push('/')
  }

  toastNotification = async (message) => {
    this.setState({ toast: message }, () => {
      setTimeout(() => this.setState({ toast: false }), 5000)
    })
  }

  render() {

    const { page, popup, toast } = this.state

    return (
      <>
        <nav className="navbar-expand">   
          <div className="navbar-nav">
            <Link to="/quests" className={`nav-link ${page === 'quests' ? 'active' : ''}`} onClick={() => this.selectNavItem('quests')}>Find</Link>
            <Link to="/create" className={`nav-link ${page === 'create' ? 'active' : ''}`} onClick={() => this.selectNavItem('create')}>Create</Link>
            <Link to="/users" className={`nav-link ${page === 'users' ? 'active' : ''}`} onClick={() => this.selectNavItem('users')}>Users</Link>
          </div>
          <div className={`notification-bar ${toast ? 'toasty' : ''}`}>
            <Link to="/" className={`navbar-logo ${page === 'popquest' ? 'active' : ''}`} onClick={() => this.selectNavItem('popquest')}>popQuest</Link>
            <div className="notification-text">{toast}</div>
          </div>
          <div className="navbar-nav user">
            {!isAuthenticated() && <div className="nav-link" onClick={() => this.popupForm('Register')}>Register</div>}
            {!isAuthenticated() && <div className="nav-link" onClick={() => this.popupForm('Login')} >Login</div>}
            {isAuthenticated() && <Link to="/profile" className={`nav-link ${page === 'profile' ? 'active' : ''}`} onClick={this.selectNavItem} >Profile</Link>}
            {isAuthenticated() && <div className="nav-link" onClick={this.logoutUser} >Logout</div>}
          </div>
          <div className={`popup-form ${popup ? 'selected' : ''}`}>
            <div className="form-contents">
              <div style={{ display: `${popup === 'Login' ? 'block' : 'none'}` }}>
                <Login hidePopup={this.popupForm} cancelable={page === 'create' ? null : this.popupForm} />
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
