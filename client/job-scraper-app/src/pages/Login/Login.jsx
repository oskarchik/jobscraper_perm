import { Form, Toast, ToggleButton } from '../../components';
import { useToast } from '../../hooks';
import { StyledLoginPage } from './Login.styled';

const Login = () => {
  const { notification } = useToast();
  return (
    <StyledLoginPage className='login'>
      {notification?.response && <Toast />}
      <ToggleButton />
      <Form />
    </StyledLoginPage>
  );
};

export default Login;
