import React from "react";
import './app.css'
import {useState} from "react";
import ItemFormComponent from "./ItemFormComponent";
import { showSuccess, showError } from "../toast";
import { deleteRecentItemService } from "../fetch2";
import PaymentFormComponent from "./PaymentFormComponent";
import { deleteRecentPaymentService } from "../fetch2";

const CustomerInDetail = ({ onClose,customer,onSendData2}) => {



  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);


  const totalPurchased = 3000;
  const totalReceived = 5000;
  const remainingAmount = totalPurchased - totalReceived;

  const deleteRecentItem = async () => {
    try {
      const {response,data} = await deleteRecentItemService(customer._id);

      if (!response.ok) {
        showError(data?.error || "Failed to delete recent item");
        return;
      }
      showSuccess("Deleted Recent Item Successfully");
      onSendData2(data.customer);
    } catch (error) {
      console.error("Error deleting recent item:", error);
    }
  };

  const deleteRecentPayment = async () => {
    try{
      const {response,data}=await deleteRecentPaymentService(customer._id);
      if (!response.ok) {
        showError(data?.error || "Failed to delete recent payment");
        return;
      }
      showSuccess("Deleted Recent Payment Successfully");
      onSendData2(data.customer);

    }catch(error){
      console.error("Error deleting recent payment:", error);
    }
  }


  return (

    <div className="customer-overlay" onClick={onClose}>
      <div className="customer-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Header */}
        <div className="customer-header">
          <div className="customer-details">
            <h1>{customer?.name}</h1>
            <h2>+91 {customer?.phone}</h2>
            <h2>{customer?.address}</h2>
          </div>

          <div className={`customer-remaining-block ${remainingAmount < 0 ? 'negative' : ''}`}>
            <p>AMOUNT RECEIVABLE</p>
            <h1>{customer?.remainingAmount}</h1>
          </div>
        </div>

        {/* Columns Container */}
        <div className="customer-columns">
          
          {/* Left Column: Purchased */}
          <div className="column-card">
            <div className="column-header">
              <h3>Items sold</h3>
            </div>
            
            <div className="table-scroll-area">
              <table className="data-table">
               <thead>
                 <tr>
                    <th>No</th>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                 </tr>
                </thead>   
                <tbody>
                  {customer?.items.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>No items found.</td>
                    </tr>
                  ) : (
                    customer.items.map((item,index)=>(
                    <tr key={item._id}>
                      <td>{index+1}</td>
                      <td>{item.itemName}</td>
                      <td>₹{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price * item.quantity}</td>
                    </tr>
                  ))
                   
                  )}
                  </tbody>           
                
                
                </table>
            </div>

            <div className="action-area">
              <button className="btn-delete" onClick={()=>deleteRecentItem()}    >Delete Recent</button>
              <button className="btn-primary" onClick={()=>setShowNewCustomerForm(true)}>Add New Item</button>
            </div>

            <div className="total-block">
              <span>Total Purchased</span>
              <h1>₹{customer?.totalAmount}</h1>
            </div>
          </div>

          {/* Right Column: Received */}
          <div className="column-card">
            <div className="column-header">
              <h3>Amount Received</h3>
            </div>

            <div className="table-scroll-area">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Amount Received</th>
                    <th>Via</th>
                  </tr>


                </thead>
                <tbody>
                  {customer?.amount.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>No payments found.</td>
                    </tr>
                  ) : ( 
                      customer.amount.map((amt,index)=>(
                    <tr key={amt._id}>
                      <td>{index+1}</td>
                      <td>₹{amt.paidAmount}</td>
                      <td>{amt.via}</td>
                    </tr>
                  ))

                  )} 
                </tbody>
              </table>
            </div>

            <div className="action-area">
              <button className="btn-delete" onClick={()=>deleteRecentPayment()}>Remove Recent Payment</button>
              <button className="btn-primary" onClick={()=>setShowPaymentForm(true)}>Receive Amount</button>
            </div>

            <div className="total-block">
              <span>Total Received</span>
              <h1>₹{customer?.paidAmount}</h1>
            </div>
          </div>

        </div>
      </div>

      {showNewCustomerForm && (
        <ItemFormComponent onClose={()=>setShowNewCustomerForm(false)}
         onSendData2={onSendData2}
          data={customer._id.toString()}/>
      )}

      {showPaymentForm && (
        <PaymentFormComponent onClose={()=>setShowPaymentForm(false)} 
        onSendData2={onSendData2}
         data={customer._id.toString()}/>
      )}



    </div>
  );
};

export default CustomerInDetail;