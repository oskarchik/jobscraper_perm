import styled from 'styled-components';

export const StyledForm = styled.form`
  .info {
    margin: 0 auto;
    width: 200px;
    text-align: center;
    padding: 0;
    font-size: 20px;
    font-weight: 300;
  }
  .form {
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }
  .input {
    background: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.fontColor};
    width: 100%;
    border: 0;
    border-bottom: 1px solid ${({ theme }) => theme.fontColor};
    margin: 15px 0;
    padding: 5px;
    box-sizing: border-box;
    font-size: 14px;
    outline: none;
  }
  .input::placeholder {
    color: ${({ theme }) => theme.fontColor};
  }
  .submit {
    padding: 10px 20px;
    margin-top: 10px;
    border-radius: 5px;
    border: 0;
    box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2);
    background-color: ${({ theme }) => theme.actionColor};
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  .submit:hover {
    background: ${({ theme }) => theme.hoverColor};
  }

  .container .info span a {
    color: #000000;
    text-decoration: none;
  }
  .container .info span .fa {
    color: #ef3b3a;
  }
`;
