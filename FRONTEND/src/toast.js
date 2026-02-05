import { toast, Bounce } from "react-toastify";
export const showSuccess = (msg) =>
  toast.success(msg, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    transition: Bounce,
  });

export const showError = (msg) =>
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    theme: "light",
    hideProgressBar: true,
  });