import React, { useEffect, useState } from "react";
import "./app.css";
import CustomerInDetail from "./CustomerInDetail";

const CustomerComponent = ({ customer,onSendData2}) => {
  // const [customerData, setCustomerData] = useState(customer);
  const [showDetails, setShowDetails] = useState(false);

  // useEffect(() => {
  //   sdthedata(customerData);


  // }, [customerData]);





  return (
    <div className="customer-card" onClick={() => setShowDetails(true)}>
      <h3 className="customer-name">{customer?.name}</h3>
      <p className="customer-phone">{customer?.phone}</p>
      <p className="customer-address">{customer?.address}</p>

      {showDetails && (
        <CustomerInDetail
          customer={customer}
          onClose={() => setShowDetails(false)}
          onSendData2={onSendData2}
        />
      )}
    </div>
  );
};

export default CustomerComponent;