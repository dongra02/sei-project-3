import React from 'react' 
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">   
        <div className="navbar-nav">
          <Link to="/" className="nav-item nav-link active">Home <span className="sr-only">(current)</span></Link>
          <Link to="/routes" className="nav-item nav-link active">Browse Routes</Link>
          <Link to="" className="nav-item nav-link active">Create Routes</Link>
        </div>   
    </nav>
  )
}

export default Navbar
