import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export const successMessage = (message) => {
  return toast.success(message);
};
export const errorMessage = (message) => toast.error(message);
export const infoMessage = (message) => toast.info(message);

export const currencyFormatter = (amount) => {
  const fm = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });
  return fm.format(amount);
};

export const saleDateFormatter = (dateString) => {
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(dateString).toLocaleString("en-US", options);
};

export const useToggleOpen = (openIndex, setOpenIndex, index) => {
  const ref = useRef();
  const isOpen = openIndex === index;

  const toggle = () => setOpenIndex(isOpen ? null : index);
  const close = () => setOpenIndex(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [ref]);
  return { isOpen, toggle, close, ref };
};
