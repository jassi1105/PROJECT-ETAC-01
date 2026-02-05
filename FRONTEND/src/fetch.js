 export const registerService = async (userData) => {
  const response = await fetch("http://localhost:3000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
     credentials: "include", 
  });

  const data = await response.json();

  return { response, data };
};



 export const loginService = async (loginData) => {
  const response = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
     credentials: "include", 
  });

  const data = await response.json();

  return { response, data };
};

export const logoutService = async () => {
  const response = await fetch("http://localhost:3000/api/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // VERY IMPORTANT for sessions
  });

  const data = await response.json();
  return { response, data }; // { success, message }
};


export const addNewCustomerService=async(customerdata)=>{
    const response = await fetch("http://localhost:3000/api/customers/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerdata),
    credentials: "include",
  });
    const data = await response.json();

  return { response, data };
}


export const assignCustomertoUserService=async(ddata)=>{
    const response = await fetch("http://localhost:3000/api/user-customers/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ddata),
    credentials: "include",
  });
    const data = await response.json();

  return { response, data };
}