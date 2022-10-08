import { Navigate, Outlet, useLocation } from 'react-router';

import { useAuth } from '../../hooks';
const SecureRoute = () => {
  const { accessToken } = useAuth();
  const location = useLocation();

  return accessToken ? <Outlet /> : <Navigate to='login' state={{ from: location }} replace />;
};

export default SecureRoute;
