import { data } from "react-router-dom";

export const getAllCustomersbyUserService=async(userid)=>{

    const response=await fetch(`http://localhost:3000/api/user-customers/user/${userid}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
              },
            credentials: "include", // VERY IMPORTANT for sessions
    })
           const data=await response.json();

           return {response,data};
}
export const addNewItemService=async(datatosend)=>{

    const response=await fetch(`http://localhost:3000/api/customers/add-item`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            credentials: "include", // VERY IMPORTANT for sessions
            body: JSON.stringify(datatosend),
    })
           const data=await response.json();

           return {response,data};
} 

export   const deleteRecentItemService = async (customerId) => {
  const response = await fetch(`http://localhost:3000/api/customers/delete-item`, {   
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ customerId }),
      });
       
      const data = await response.json();
      
      return { response, data };    
  };


  export const receivePaymentService=async(datatosend)=>{

    const response=await fetch(`http://localhost:3000/api/customers/receive-payment`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            credentials: "include", // VERY IMPORTANT for sessions
            body: JSON.stringify(datatosend),
    })
           const data=await response.json();

           return {response,data};
}

export const deleteRecentPaymentService=async(customerId)=>{

    const response=await fetch(`http://localhost:3000/api/customers/delete-payment`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              },
            credentials: "include", // VERY IMPORTANT for sessions
            body: JSON.stringify({customerId}),
    })
           const data=await response.json();

           return {response,data};
}   

export const getuserdetailsService=async(userid)=>{

    const response=await fetch(`http://localhost:3000/api/users/${userid}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
              },
            credentials: "include", // VERY IMPORTANT for sessions
    })
           const data=await response.json();

           return {response,data};
}   