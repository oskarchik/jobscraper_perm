import { StyledHeader } from './Header.styled';

import { Navbar, ToggleButton } from '../';
const Header = () => {
  return (
    <StyledHeader>
      <ToggleButton />
      <Navbar />
    </StyledHeader>
  );
};

export default Header;
