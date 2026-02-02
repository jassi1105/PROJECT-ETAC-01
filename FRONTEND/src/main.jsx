import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import Authentication from './pages/Authentication.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Authentication/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>
)
