import { StyledInput } from './Input.styled';

const Input = ({ type, placeholder, onChange, value, name }) => {
  return <StyledInput type={type} placeholder={placeholder} onChange={onChange} value={value} name={name} />;
};

export default Input;
