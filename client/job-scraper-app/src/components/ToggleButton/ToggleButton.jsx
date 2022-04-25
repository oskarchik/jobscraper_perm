import { StyledToggleButton } from './ToggleButton.styled';

import { useCheckBox, useToggleTheme } from '../../hooks';

const ToggleButton = () => {
  const toggleTheme = useToggleTheme();
  const { isChecked, setIsChecked } = useCheckBox();

  return (
    <StyledToggleButton className='toggle'>
      <input type='checkbox' name='' id='' onChange={() => setIsChecked((prev) => !prev)} checked={isChecked} />
      <span className='check' onClick={toggleTheme}></span>
    </StyledToggleButton>
  );
};

export default ToggleButton;
