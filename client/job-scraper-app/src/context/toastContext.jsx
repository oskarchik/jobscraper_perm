import { useEffect } from 'react';
import { createContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [notification, setNotification] = useState();
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(), 3500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return <ToastContext.Provider value={{ notification, setNotification }}>{children}</ToastContext.Provider>;
};

export default ToastContext;
