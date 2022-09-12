import { createContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [notification, setNotification] = useState();

  return <ToastContext.Provider value={{ notification, setNotification }}>{children}</ToastContext.Provider>;
};

export default ToastContext;
