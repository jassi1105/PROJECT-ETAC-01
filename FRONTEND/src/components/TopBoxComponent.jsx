import React from "react";
import './app.css'
import {useState} from "react"
import CustomerFormComponent from "./CustomerFormComponent";
import {logoutService} from "../fetch";
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from "../toast";

const DashboardTopBoard = ({
  name,
  email,
  totalCount,
  totalSold,
  totalReceived,
  remaining,
  onSearch,
  onLogout,
}) => {
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
                    <h2>{totalCount}56</h2>
                </div>

                <div className="stat-card">
                    <p>Total Amount Sold</p>
                    <h2>₹{totalSold}25678</h2>
                </div>

                <div className="stat-card">
                    <p>Total Amount Received</p>
                    <h2>₹{totalReceived}15890</h2>
                </div>

                <div className="stat-card">
                    <p>Remaining Amount</p>
                    <h2>₹{remaining}6789</h2>
                </div>
            </div>

        </div>

        <div className="user-details">
             <h2 className="user-name">{name}Hi, Tangella Jaswanth</h2>
             <p className="user-email">{email}jassijaswanth360@gmail.com</p>
        </div>

        <div className="dashboard-logout-btn">
            <button className="btn--primary " onClick={logout}>logout</button>
            <button className="btn--primary" onClick={() => setShowModal(true)}>ADD NEW CUSTOMER</button>
        </div>
        {ShowModal && (
        <CustomerFormComponent
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
};

export default DashboardTopBoard;