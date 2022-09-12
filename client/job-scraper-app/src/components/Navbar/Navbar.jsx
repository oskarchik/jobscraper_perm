import { NavLink, useNavigate } from 'react-router-dom';
import { StyledNavbar } from './Navbar.styled';

import { useAuth } from '../../hooks';

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate('/login');
  };
  return (
    <StyledNavbar>
      {user && (
        <ul className='menu'>
          <li className='menu-item'>
            <NavLink to='/alljobs' className='link'>
              ALL JOBS
            </NavLink>
          </li>
          <li className='menu-item'>
            <NavLink to='/' className='link'>
              LATESTS JOBS
            </NavLink>
          </li>
          <li className='menu-item'>
            <NavLink to='#' onClick={signOut} className='link'>
              LOGOUT
            </NavLink>
          </li>
        </ul>
      )}
    </StyledNavbar>
  );
};
export default Navbar;
