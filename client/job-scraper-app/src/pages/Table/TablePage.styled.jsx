import styled from 'styled-components';

export const StyledTAblePage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100vw;

  .title {
    display: block;
    text-align: center;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.fontColor};
    ${'' /* font-size: 2em; */}
  }
`;
