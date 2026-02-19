import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopBoxComponent from '../components/TopBoxComponent';
import CustomerComponent from '../components/CustomerComponent';
import { showSuccess, showError } from "../toast";
import { getAllCustomersbyUserService, getuserdetailsService } from '../fetch2';
import './index.css';
import { useMemo } from 'react';
const Dashboardpage = () => {
  const { userid } = useParams();

  const [customers, setCustomers] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  // Fetch User Details
  useEffect(() => {
    if (!userid) return;

    (async () => {
      try {
        const { response, data } = await getuserdetailsService(userid);

        if (!response.ok) {
          showError(data.error || "Failed to fetch user details");
          return;
        }

        setUserDetails(data);

      } catch (error) {
        console.error(error);
        showError("Failed to fetch user details");
      }
    })();

  }, [userid]);

  // Fetch Customers
  useEffect(() => {
    if (!userid) return;

    (async () => {
      try {
        const { response, data } = await getAllCustomersbyUserService(userid);

        if (!response.ok) {
          showError(data.error || "Failed to fetch customers");
          return;
        }

        setCustomers(Array.isArray(data) ? data : []);

      } catch (error) {
        console.error(error);
        showError("An unexpected error occurred");
      }
    })();

  }, [userid,customers]);

  const sortedCustomers = useMemo(() => {
  return [...customers].sort((a, b) =>
    a.customerId.name
      ?.toLowerCase()
      .localeCompare(b.customerId.name?.toLowerCase())
  );
}, [customers]);

  return (
    <div>
      <TopBoxComponent data={customers} user={userDetails} />
      <div className="customer-list">
        {sortedCustomers?.map((item) => (
        <div key={item._id}>
          <CustomerComponent customer={item.customerId} />
        </div>
      ))}
      </div>

    
    </div>
  );
}

export default Dashboardpage;