import { toast } from "react-toastify";
const config = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  progress: undefined,
};

export const showError = (message) => {
  return toast.error(message, config);
};

export const showSuccess = (message) => {
  return toast.success(message, config);
};

export const showWarning = (message) => {
  return toast.warn(message, config);
};
