import React, { useState } from "react";
import "./customerform.css";
import { addNewCustomerService,assignCustomertoUserService } from "../fetch";
import { showSuccess, showError } from "../toast";

const CustomerFormComponent = ({ onClose }) => {
  const initialCustomerState = {
    name: "",
    phone: "",
    address: "",
  };

  const [newCustomerdata, setnewCustomerdata] = useState(initialCustomerState);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setnewCustomerdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const { response, data } = await addNewCustomerService(newCustomerdata);
      if (!response.ok) {
        showError(data?.error || "Failed to add customer");
        return;
      }
    const datatosend = {
      customerId: data.customer._id,
      role: "viewer",
    };

    const {response: assignResponse,data: assignData,} = await assignCustomertoUserService(datatosend);

    if (!assignResponse.ok) {
      showError(assignData?.message || "Customer assignment failed");
      return;
    }

    // 3️⃣ Final success
    showSuccess("Added New Customer Successfully");
    setnewCustomerdata(initialCustomerState);
    setTimeout(()=>{onClose();}, 1000)
    

    }  catch (error) {
           console.error("handleSubmit error:", error);
           showError(error?.message || "Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="modal-overlay" >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2 className="modal-title">Add New Customer</h2>

        <form className="modal-form" onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder="Customer Name"
            name="name"
            value={newCustomerdata.name}
            onChange={handlechange}
            required
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            name="phone"
            value={newCustomerdata.phone}
            onChange={handlechange}
            required
          />

          <input
            type="text"
            placeholder="Address"
            name="address"
            value={newCustomerdata.address}
            onChange={handlechange}
          />

          <button type="submit">Add Customer</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerFormComponent;