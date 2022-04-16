import { StyledButton } from './Button.styled';

const Button = ({ text, type, width, onClick }) => {
  return (
    <StyledButton onClick={onClick} type={type} width={width}>
      {text}
    </StyledButton>
  );
};

export default Button;
