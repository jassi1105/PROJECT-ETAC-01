import React from 'react'
import './index.css'
import { showSuccess, showError } from "../toast";
import {loginService} from '../fetch';
import { useNavigate } from 'react-router-dom';


const Loginpage = () => {

const navigate = useNavigate();

  const [logindata, setLogindata] = React.useState({
    email: "",
    password: "",
  });
  const initialLoginState = {
    email: "",
    password: "",
  };
  const handlechange = ({ target: { name, value } }) => {
    setLogindata(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { response, data } = await loginService(logindata);

      if (!response.ok) {
        showError(data.error);
        if (!data.person){
          setTimeout(() => navigate("/register"), 1000);
          return ;
        }
        else{
          setLogindata({
            ...logindata,
            password:""
          })
          return ;
        }
      }
      showSuccess(data.message);
      setTimeout(() => navigate("/dashboard"), 1000);
      setLogindata(initialLoginState);

    } catch (error) {
      console.error("Login error:", error);
       showError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="layout-center">
  <form className="auth-card" >
    <h2 className="auth-title">Login</h2>

    <div className="auth-field">
      <input type="email" placeholder="Email" className="auth-input" onChange={handlechange} name="email" value={logindata.email} />
    </div>

    <div className="auth-field">
      <input type="password" placeholder="Password" className="auth-input" onChange={handlechange} name="password" value={logindata.password} />
    </div>

    <button type="submit" className="btn btn--primary btn--full" onClick={handlesubmit}>
      Login
    </button>
  </form>
</div>
  )
}

export default Loginpage
