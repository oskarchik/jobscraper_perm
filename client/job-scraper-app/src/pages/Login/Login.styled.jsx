import styled from 'styled-components';

export const StyledLoginPage = styled.main`
  width: 100vw;
  ${'' /* height: 100vh; */}
  padding: 8% 0 0;
  margin: auto;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.fontColor};
  position: relative;

  .toggle {
    position: absolute;
    top: 5%;
    left: 1%;
  }
`;
