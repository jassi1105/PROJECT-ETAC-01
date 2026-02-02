import React from 'react'
import './Authentication.css'
import { Link } from 'react-router-dom'
const Authentication = () => {
  return (
    <div>
        <div className="landing-container">
      
            <main className="hero-section">
                <h1 className="project-title1">EVERYTHING ABOUT </h1>
                <h1 className="project-title2">CUSTOMERS</h1>
                <p className="subtitle">Managing relationships, insights, and data in one place.</p>
        
                <div className="button-group">
                  <Link to="/Register">
                    <button className="btn btn-register">Register</button>
                  </Link>
                  <Link to="/Login">
                    <button className="btn btn-login">Login</button>
                  </Link>
                </div>
            </main>
        </div>
      
    </div>
  )
}

export default Authentication
