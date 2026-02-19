import React from 'react'
import {useState} from "react"
import "./customerform.css";
import { showSuccess, showError } from "../toast";
import { receivePaymentService } from '../fetch2';

const PaymentFormComponent = ({onClose, sendData, data}) => {

 

  const initialPaymentState = {
    paidAmount: "",
    via:"online"
  };
   const [newPaymentdata, setnewPaymentdata] = useState(initialPaymentState);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setnewPaymentdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const datatosend={
      paymentData: newPaymentdata,
      customerId: data,
    }
    console.log("Data to send:", datatosend);
    try {
      const {response,data}=await receivePaymentService(datatosend);
      if(!response.ok){
        showError(data?.error || "Failed to receive payment");
        console.error("Error response:", data);
        return;
      }
      showSuccess("Payment received successfully");
      sendData(data.customer);
      setnewPaymentdata(initialPaymentState);
      setTimeout(()=>{onClose();}, 1000)  

     
    } catch (error) {
      showError("Failed to receive payment");
      console.error("Error receiving payment:", error);
    }
  };  

  
  return (



     <div className="modal-overlay" onClick={(e) => e.stopPropagation()} >
       <div className="modal-container">
             <button className="close-btn" onClick={onClose}>✕</button>

             <h2 className="modal-title">Receive Payment</h2>

        <form className="modal-form" onSubmit={handlesubmit}>
          <input
            type="Number"
            placeholder="Enter Amount"
            name="paidAmount"
            value={newPaymentdata.paidAmount}
            onChange={handlechange}
            required
          />

            <select
                  value={newPaymentdata.via}
                  onChange={(e) => setnewPaymentdata({...newPaymentdata, via: e.target.value})}
          >
              <option value="">Select Payment Mode</option>
              <option value="Cash">Cash</option>
              <option value="Online">Online</option>
            </select>


          <button type="submit">Receive Payment</button>

        </form>
      </div>
    </div>
  )
}

export default PaymentFormComponent
