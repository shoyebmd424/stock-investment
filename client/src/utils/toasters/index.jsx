import { toast } from "react-toastify";
export const debounce = (fn, delay) => {
  let timerId;
  return (...params) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(fn, delay, ...params);
  };
};

export const showToast = debounce((type, message) => {
  if (type.toLowerCase() === "success") {
    toast.success(message || "Success");
  } else if (type.toLowerCase() === "error") {
    toast.error(message || "something went wrong!");
  }
}, 1000);
