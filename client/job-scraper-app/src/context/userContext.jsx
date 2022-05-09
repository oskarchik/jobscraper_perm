import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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
        setToken(response.data.accessToken);
        setUser(response.data.user);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      const response = await axios.get('/api/auth/logout', {
        withCredentials: true,
      });
    } catch (error) {}
  };

  const value = {
    user,
    setUser,
    token,
    setToken,
    login,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
