import { Form, ToggleButton } from '../../components';
import { StyledLoginPage } from './Login.styled';

const Login = () => {
  const initialUrl = 'http://localhost:8000/api/jobs/alljobs?page=0';
  return (
    <StyledLoginPage className='login'>
      <ToggleButton />
      <Form />
    </StyledLoginPage>
  );
};

export default Login;
