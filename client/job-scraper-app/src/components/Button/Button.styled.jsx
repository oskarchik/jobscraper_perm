import styled from 'styled-components';

export const StyledButton = styled.button`
  padding: 10px;
  margin-left: 10px;
  min-width: 120px;
  border-radius: 5px;
  border: 0;
  box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.actionColor};
  color: white;
  font-weight: bold;
  cursor: pointer;
  letter-spacing: 1.5px;
  font-size: 20px;
  :hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
`;
