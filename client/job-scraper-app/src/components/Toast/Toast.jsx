import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from '../../hooks';

const Toast = () => {
  const { notification } = useToast();
  useEffect(() => {
    toast.error(notification?.response?.data?.msg);
  }, [notification]);
  return <ToastContainer position='top-right' closeOnClick autoClose={3000} />;
};

export default Toast;
