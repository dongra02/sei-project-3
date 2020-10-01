import React from 'react' 
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to="/routes" className="nav-item nav-link active">Home <span className="sr-only">(current)</span></Link>
          <Link to="" className="nav-item nav-link">Browse Routes</Link>
          <Link to="" className="nav-item nav-link">Create Routes</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
