import axios from '../api/axios';
import { useAuth } from './index';

export const useRefreshToken = () => {
  const { setUser } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/api/auth/token', {
      withCredentials: true,
    });
    setUser((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};
