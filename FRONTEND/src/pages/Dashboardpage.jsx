import React from 'react'
import TopBoxComponent from '../components/TopBoxComponent'
import CustomerComponent from '../components/CustomerComponent'
import {useState,useEffect} from 'react';
import { showSuccess, showError } from "../toast";


const Dashboardpage = () => {
  const [isData,setisData]=useState(false)
  useEffect(() => {
    const data=async(e)=>{
    e.preventDefault();
    try{


    }catch(err){
      console.error('data function failed:',err)
      showError("error in getting data")

    }
  }
 
   }, []);




  


  return (
    <div>
      <TopBoxComponent/>
      <CustomerComponent/>
      
    </div>
  )
}

export default Dashboardpage
