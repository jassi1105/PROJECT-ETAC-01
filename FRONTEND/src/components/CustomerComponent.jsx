import React, { useState } from "react";
import "./app.css";
import CustomerInDetail from "./CustomerInDetail";

const CustomerComponent = ({ customer}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="customer-card">
      <h3 className="customer-name">{customer?.name}</h3>
      <p className="customer-phone">{customer?.phone}</p>
      <p className="customer-address">{customer?.address}</p>

      <button onClick={() => setShowDetails(true)}>
        Show Details
      </button>

      {showDetails && (
        <CustomerInDetail
          customer={customer}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default CustomerComponent;