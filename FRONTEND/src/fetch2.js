
export const getAllCustomersbyUserService=async(data)=>{

    const response=await fetch("/api/user-customers/user/:userId",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
              },
            credentials: "include", // VERY IMPORTANT for sessions
    })



}