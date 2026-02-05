import React from "react";
import './app.css'

const CustomerInDetail = ({ onClose }) => {
  const customers = ["Rahul", "Sita", "Arjun", "Meena", "Ravi", "Kavya"];

  const totalPurchased = 3000;
  const totalReceived = 5000;
  const remainingAmount = totalPurchased - totalReceived;

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
            <h1>Rahul Kumar</h1>
            <h2>+91 70134 59658</h2>
            <h2>Visakhapatnam, Andhra Pradesh</h2>
          </div>

          <div className={`customer-remaining-block ${remainingAmount < 0 ? 'negative' : ''}`}>
            <p>AMOUNT RECEIVABLE</p>
            <h1>₹{remainingAmount.toLocaleString()}</h1>
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
                <tbody>
                  {customers.map((name, index) => (
                    <tr key={index}>
                      {/* Removed the 500 price block, keeping only the name */}
                      <td>{name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="action-area">
              <button className="btn-delete">Delete Recent</button>
              
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter Item Name"
                  className="input-field"
                />
                <button className="btn-primary">Add</button>
              </div>
            </div>

            <div className="total-block">
              <span>Total Purchased</span>
              <h1>₹{totalPurchased.toLocaleString()}</h1>
            </div>
          </div>

          {/* Right Column: Received */}
          <div className="column-card">
            <div className="column-header">
              <h3>Amount Received</h3>
            </div>

            <div className="table-scroll-area">
              <table className="data-table">
                <tbody>
                  {customers.map((name, index) => (
                    <tr key={index}>
                      {/* Removed the 500 price block here as well */}
                      <td>Payment from {name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="action-area">
              <button className="btn-delete">Remove Recent</button>

              <div className="input-group">
                <input
                  type="number"
                  placeholder="Enter Amount"
                  className="input-field"
                />
                <button className="btn-primary">Receive</button>
              </div>
            </div>

            <div className="total-block">
              <span>Total Received</span>
              <h1>₹{totalReceived.toLocaleString()}</h1>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerInDetail;