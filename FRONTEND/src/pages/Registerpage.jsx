import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../toast";
import {registerService} from "../fetch";

const Registerpage = () => {

  const navigate = useNavigate();

const initialUserState = {
  name: "",
  email: "",
  password: "",
};

const [newUserdata, setNewUserdata] = useState(initialUserState);

const handlechange = ({ target: { name, value } }) => {
  setNewUserdata(prev => ({
    ...prev,
    [name]: value,
  }));
};

const handlesubmit = async (e) => {
  e.preventDefault();

  try {
    const { response, data } = await registerService(newUserdata);

    if (!response.ok) {
       showError(data.error);
      if (response.status === 409) {
        setTimeout(()=>{
          navigate("/login")
        },1000)
        return;
      }
      return;
    }

    // ✅ Success
    showSuccess(data.message);

    setTimeout(() => {
      navigate("/login");
    }, 1000);

    setNewUserdata(initialUserState);

  } catch (error) {
    console.error("Registration failed:", error);
    showError("Something went wrong. Please try again later.");
  }
};

  return (
    <div className="layout-center">
      <form className="auth-card" onSubmit={handlesubmit}>
        <h2 className="auth-title">Register</h2>

        <div className="auth-field">
          <input
            type="text"
            name="name"
            value={newUserdata.name}
            onChange={handlechange}
            placeholder="Name"
            className="auth-input"
            required
          />
        </div>

        <div className="auth-field">
          <input
            type="email"
            name="email"
            value={newUserdata.email}
            onChange={handlechange}
            placeholder="Email"
            className="auth-input"
            required
          />
        </div>

        <div className="auth-field">
          <input
            type="password"
            name="password"
            value={newUserdata.password}
            onChange={handlechange}
            placeholder="Password"
            className="auth-input"
            required
          />
        </div>
        

        <button
          type="submit"
          className="btn btn--primary btn--full"
          onClick={handlesubmit}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registerpage;