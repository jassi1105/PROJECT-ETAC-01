import React, { useState } from 'react'
import './Register.css'
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
  const [newUserdata, setNewUserdata] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [registered, setRegistered] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlechange = (e) => {
    const { name, value } = e.target
    setNewUserdata(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserdata)
      })

      const data = await response.json() // ✅ read ONCE

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }
      setRegistered(true);
      setTimeout(() => {
      navigate("/login");
    }, 1000);

      console.log(data)
    //   alert("Registration successful 🎉")
        // navigate("/login");

      setNewUserdata({
        name: "",
        email: "",
        password: ""
      })

    } catch (err) {
      console.error(err)
      alert(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
   <div className="landing-container">
  <form className="auth-form" onSubmit={handlesubmit}>

    {registered && (
      <div className="success-overlay">
        Registered successfully ✅
      </div>
    )}

    <h2 className="form-title">Register</h2>

    <div className="form-group">
      <input
        type="text"
        name="name"
        value={newUserdata.name}
        onChange={handlechange}
        placeholder="Name"
        className="form-input"
        required
      />
    </div>

    <div className="form-group">
      <input
        type="email"
        name="email"
        value={newUserdata.email}
        onChange={handlechange}
        placeholder="Email"
        className="form-input"
        required
      />
    </div>

    <div className="form-group">
      <input
        type="password"
        name="password"
        value={newUserdata.password}
        onChange={handlechange}
        placeholder="Password"
        className="form-input"
        required
      />
    </div>

    <button
      type="submit"
      className="btn-register"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Registering..." : "Register"}
    </button>

  </form>
</div>
  )
}

export default Register