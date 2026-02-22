import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopBoxComponent from '../components/TopBoxComponent';
import CustomerComponent from '../components/CustomerComponent';
import { showSuccess, showError } from "../toast";
import { getAllCustomersbyUserService, getuserdetailsService } from '../fetch2';
import './index.css';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
const Dashboardpage = () => {
  const navi=useNavigate();
  const { userid } = useParams();

  const [customers, setCustomers] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  // Fetch User Details
    useEffect(() => {
    if (!userid) return;

    (async () => {
      try {
        const { response, data } = await getAllCustomersbyUserService(userid);
        const { response: userResponse, data: userData } = await getuserdetailsService(userid);

        if (!userResponse.ok) {
          if(userResponse.status||response.status === 401){
            showError("Please Login!");
            setTimeout(() => {
              navi("/login");
            }, 1000);
            return 
          }
          showError(userData.error || "Failed to fetch user details");
          return;
        }


        setUserDetails(userData);

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

  }, [userid]);


// handleCustomerUpdate
const handleUpdateCustomer = (updatedCustomer) => {
  setCustomers((prevCustomers) =>
    prevCustomers.map((item) =>
      item.customerId._id === updatedCustomer._id
        ? {
            ...item,
            customerId: updatedCustomer, 
          }
        : item
    )
  );
};


const handleAddCustomer = (x,y) => {
  setCustomers((prevCustomers) => [
    ...prevCustomers,
    {x, customerId: y}
  ]);
  console.log(customers);
};



 const sortedCustomers = useMemo(() => {
  return [...customers].sort((a, b) =>
    (a.customerId?.name || "")
      .toLowerCase()
      .localeCompare((b.customerId?.name || "").toLowerCase())
  );
}, [customers]);





  return (
    <div>
      <TopBoxComponent data={customers} user={userDetails} onSendData1={handleAddCustomer}/>


    {sortedCustomers.length === 0 ? (
  <h3 className="no-customers">NO CUSTOMERS FOUND</h3>
) : (
  <div className="customer-list">
    {sortedCustomers?.map((item) => (
      <div key={item._id}>
        <CustomerComponent 
          customer={item.customerId} 
          onSendData2={handleUpdateCustomer}
        />
      </div>
    ))}
  </div>
)}

    </div>
  );
}

export default Dashboardpage;