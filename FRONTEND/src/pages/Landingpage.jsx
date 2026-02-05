import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
const Landingpage = () => {
  return (
    <div>
        <div className="layout-center">
  <main className="hero">
    <h1 className="user-details-project-title1">EVERYTHING ABOUT</h1>
    <h1 className="user-details-project-title2">CUSTOMERS</h1>

    <p className="hero-subtitle">
      Managing relationships, insights, and data in one place.
    </p>

    <div className="hero-actions">
      <Link to="/register">
        <button className="btn btn--primary">Register</button>
      </Link>
      <Link to="/login">
        <button className="btn btn--secondary">Login</button>
      </Link>
    </div>
  </main>
</div>
      
    </div>
  )
}

export default Landingpage
