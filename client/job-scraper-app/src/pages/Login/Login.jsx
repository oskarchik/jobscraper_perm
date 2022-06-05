import { Form, ToggleButton } from '../../components';
import { StyledLoginPage } from './Login.styled';

const Login = () => {
  return (
    <StyledLoginPage className='login'>
      <ToggleButton />
      <Form />
    </StyledLoginPage>
  );
};

export default Login;
