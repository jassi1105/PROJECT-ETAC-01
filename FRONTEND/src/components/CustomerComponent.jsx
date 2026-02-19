import React, { useState } from "react";
import "./app.css";
import CustomerInDetail from "./CustomerInDetail";

const CustomerComponent = ({ customer}) => {
  const [customerData, setCustomerData] = useState(customer);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="customer-card" onClick={() => setShowDetails(true)}>
      <h3 className="customer-name">{customerData?.name}</h3>
      <p className="customer-phone">{customerData?.phone}</p>
      <p className="customer-address">{customerData?.address}</p>

      {showDetails && (
        <CustomerInDetail
          customer={customerData}
          onClose={() => setShowDetails(false)}
          sendthedata={setCustomerData}
        />
      )}
    </div>
  );
};

export default CustomerComponent;