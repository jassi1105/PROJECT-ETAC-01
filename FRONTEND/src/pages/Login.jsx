import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div>
        <form className="auth-form">
            <h2 className="form-title">Login</h2>
            <div className="form-group">
                <input type="email" placeholder="Email" className="form-input" />
            </div>
            <div className="form-group">
                <input type="password" placeholder="Password" className="form-input" />
            </div>
            <button type="submit" className="btn-btn-login">Login</button>
        </form>
      
    </div>
  )
}

export default Login
