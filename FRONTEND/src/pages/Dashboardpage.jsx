import React from 'react'
import TopBoxComponent from '../components/TopBoxComponent'
import CustomerComponent from '../components/CustomerComponent'
import {useState,useEffect} from 'react';
import { showSuccess, showError } from "../toast";
import { useParams } from 'react-router-dom';
import {getAllCustomersbyUserService} from '../fetch2';


const Dashboardpage = () => {
  const {userid}=useParams();
  const [customers,setCustomers]=useState([]);

   useEffect(() => {
  if (!userid) return;

  (async () => {
    try {
      const { response, data } =await getAllCustomersbyUserService(userid);

      if (!response.ok) {
        showError(data.error);
        return;
      }
      setCustomers(data);

    } catch (error) {
      console.error(error);
    }
  })();

}, [userid]);



  return (
    <div>
      <TopBoxComponent data={1}/>
    {customers.map((item) => (
  <div key={item._id}>
    <CustomerComponent customer={item.customerId} />
  </div>
))}






      <h1>Welcome to Dashboard for User ID: {userid}</h1>
      
    </div>
  )
}

export default Dashboardpage
