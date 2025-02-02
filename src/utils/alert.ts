import { Id, ToastOptions, TypeOptions, UpdateOptions, Zoom, toast } from "react-toastify";

const defaultOptions: ToastOptions = {
  transition: Zoom,
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const warn = (message: string, options?: ToastOptions) => {
  return toast.warn(message, { ...defaultOptions, ...options });
};

const error = (message: string, options?: ToastOptions) => {
  return toast.error(message, { ...defaultOptions, ...options });
};

const success = (message: string, options?: ToastOptions) => {
  return toast.success(message, { ...defaultOptions, ...options });
};

const loading = (message: string, options?: ToastOptions) => {
  return toast.loading(message, { ...defaultOptions, ...options });
};

const update = (id: Id, message: string, type?: TypeOptions, options?: UpdateOptions) => {
  if(type)
    return toast.update(id, { render: message, ...defaultOptions, ...options, type, isLoading: false });
  else
    return toast.update(id, { render: message, ...defaultOptions, ...options });
};

export const alert = {
  warn,
  error,
  success,
  loading,
  update,
};