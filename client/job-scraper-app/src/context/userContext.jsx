import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useToast } from '../hooks';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const { setNotification } = useToast();

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        '/api/auth/login',
        {
          email,
          password,
        },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
      if (response.data.accessToken.length) {
        setAccessToken(response.data.accessToken);
        setUser(response.data.user);
        navigate('/', { replace: true });
      }
    } catch (error) {
      setNotification(error);
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await axios.get('/api/auth/logout', {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
    setUser,
    accessToken,
    setAccessToken,
    login,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
