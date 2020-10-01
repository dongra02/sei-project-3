import React from 'react' 
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

  state = {
    loggedIn: true
  }

  fakeLogin = () => {
    this.setState({ loggedIn: !this.state.loggedIn })
  }

  render() {

    const { loggedIn } = this.state

    return (
      <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">   
        <div className="navbar-nav">
          <Link to="/" className="nav-item nav-link active">Home <span className="sr-only">(current)</span></Link>
          <Link to="/quests" className="nav-item nav-link active">Find</Link>
          <Link to="create" className="nav-item nav-link active">Create</Link>
        </div>
        <div className="navbar-nav user">
          {!loggedIn && <Link to="/register" className="nav-item nav-link active" >Register</Link>}
          {!loggedIn && <Link to="#" className="nav-item nav-link active" onClick={this.fakeLogin} >Login</Link>}
          {loggedIn && <Link to="#" className="nav-item nav-link active" onClick={this.fakeLogin} >Profile</Link>}
        </div>
      </nav>
    )
  }
}

export default Navbar
