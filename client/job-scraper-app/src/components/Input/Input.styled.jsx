import styled from 'styled-components';

export const StyledInput = styled.input`
  background: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.fontColor};
  width: 100%;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.fontColor};
  margin: 15px 0;
  padding: 5px;
  box-sizing: border-box;
  font-size: 18px;
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.fontColor};
  }
`;
