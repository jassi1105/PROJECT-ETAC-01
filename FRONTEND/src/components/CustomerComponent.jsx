import React from 'react'
import './app.css'
// import './x.css'
import CustomerInDetail from './CustomerInDetail'
import {useState} from 'react'

const CustomerComponent = ({ name, phone, address }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div>
         <div className="customer-card">
      <h3 className="customer-name">{name}Tangella Lakshmi sai mouli</h3>
      <p className="customer-phone">{phone}9347769682</p>
      <p className="customer-address"> {address}duvvada</p>
      <button onClick={()=>{setShowDetails(true)}}>show</button>
      {showDetails && (
        <CustomerInDetail onClose={() => setShowDetails(false)} />
      )}
    </div>
      
    </div>
  )
}

export default CustomerComponent
