import { useState } from 'react';
import { useNavigate } from 'react-router';

import { StyledForm } from './Form.styled';

import { useAuth } from '../../hooks/index';

import Input from '../Input/Input';

const Form = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const onInputChange = (e) => {
    const value = e.target.value;
    setInput({ ...input, [e.target.name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(input.email, input.password);
    } catch (error) {
      navigate('/login');
    }
  };

  return (
    <StyledForm>
      <div className='info'>
        <h1>LOGIN</h1>
      </div>
      <div className='form'>
        <div className='login-div'>
          <Input type='email' placeholder='EMAIL' onChange={onInputChange} value={input.email} name='email' />
          <Input
            type='password'
            placeholder='PASSWORD...'
            onChange={onInputChange}
            value={input.password}
            name='password'
            data-testid='password-input'
          />
          <input className='submit' type='submit' value='LOGIN' onClick={handleSubmit} />
        </div>
      </div>
    </StyledForm>
  );
};

export default Form;
