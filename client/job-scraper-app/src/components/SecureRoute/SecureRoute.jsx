import { Navigate, Outlet, useLocation } from 'react-router';

import { useAuth } from '../../hooks';
const SecureRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? <Outlet /> : <Navigate to='login' state={{ from: location }} replace />;
};

export default SecureRoute;
