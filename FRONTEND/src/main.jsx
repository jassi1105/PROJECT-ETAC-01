import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Landingpage from './pages/Landingpage.jsx'
import Registerpage from './pages/Registerpage.jsx'
import Loginpage from './pages/Loginpage.jsx'
import Dashboardpage from './pages/Dashboardpage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Registerpage/>}/>
      <Route path="/login" element={<Loginpage/>}/>
      <Route path="/" element={<Landingpage/>}/>
      <Route path="/Dashboard" element={<Dashboardpage/>}/>
    </Routes>
    <ToastContainer />
    </BrowserRouter>
  </StrictMode>
)
