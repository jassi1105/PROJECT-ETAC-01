import React from "react";
import './app.css'
import {useState} from "react"
import CustomerFormComponent from "./CustomerFormComponent";
import {logoutService} from "../fetch";
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from "../toast";

const DashboardTopBoard = ({data,user,onSendData1}) => {
    const totalCustomers = data.length;

const totalAmount = Array.isArray(data)
  ? data.reduce(
      (sum, c) => sum + (c?.customerId?.totalAmount || 0),
      0
    )
  : 0;

const totalPaid = Array.isArray(data)
  ? data.reduce(
      (sum, c) => sum + (c?.customerId?.paidAmount || 0),
      0
    )
  : 0;

const totalRemaining = Array.isArray(data)
  ? data.reduce(
      (sum, c) => sum + (c?.customerId?.remainingAmount || 0),
      0
    )
  : 0;



    const navigate = useNavigate();
    const [ShowModal,setShowModal]=useState(false)
    const logout = async () => {
        try {
            const {response,data} = await logoutService();
            if(!response.ok){
                return showError("Failed to logout");

            }
            showSuccess(data.message);
               setTimeout(() => {
               navigate("/login");
               }, 1000);

        } catch (error) {
               console.error(error);
                showError("Something went wrong");
           }
        };

  return (

    <div className="dashboard-board">

        <div className="dashboard-project-title">
            <h1 className="dashboard-project-title1">EVERYTHING ABOUT </h1>
            <h1 className="dashboard-project-title2">CUSTOMERS</h1>
        </div>

        <div className="dashboard-search-stats">
            <input
                type="text"
                placeholder="Search customers..."
                className="search-box"
                onChange={(e) => onSearch(e.target.value)}/>

             <div className="board-stats">
                <div className="stat-card">
                    <p>Total Customers</p>
                    <h2>{totalCustomers}</h2>
                </div>

                <div className="stat-card">
                    <p>Total Amount Sold</p>
                    <h2>₹{totalAmount}</h2>
                </div>

                <div className="stat-card">
                    <p>Total Amount Received</p>
                    <h2>₹{totalPaid}</h2>
                </div>

                <div className="stat-card">
                    <p>Remaining Amount</p>
                    <h2>₹{totalRemaining}</h2>
                </div>
            </div>

        </div>

        <div className="user-details">
             <h2 className="user-name">Hi, {user?.name}</h2>
             <p className="user-email">{user?.email}</p>
        </div>

        <div className="dashboard-logout-btn">
            <button className="btn--primary " onClick={logout}>logout</button>
            <button className="btn--primary" onClick={() => setShowModal(true)}>ADD NEW CUSTOMER</button>
        </div>
        {ShowModal && (
        <CustomerFormComponent
          onClose={() => setShowModal(false)}
          onSendData1={onSendData1}
        />
      )}

    </div>
  );
};

export default DashboardTopBoard;