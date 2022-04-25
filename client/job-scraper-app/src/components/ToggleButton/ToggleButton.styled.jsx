import styled from 'styled-components';

export const StyledToggleButton = styled.label`
  padding-left: 10px;
  input[type='checkbox'] {
    -webkit-appearance: none;
    visibility: hidden;
    display: none;
  }
  .check {
    position: relative;
    display: block;
    width: 40px;
    height: 20px;
    background: ${({ theme }) => theme.backgroundColor};
    border: 1px solid ${(props) => props.theme.fontColor};
    cursor: pointer;
    border-radius: 20px;
    overflow: hidden;
    transition: ease-in 0.5s;
  }
  input[type='checkbox']:checked ~ .check {
    background: ${({ theme }) => theme.backgroundColor};
    border: 1px solid ${({ theme }) => theme.fontColor};
  }
  .check:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    background: ${({ theme }) => theme.fontColor};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transition: 0.5s;
  }
  input[type='checkbox']:checked ~ .check:before {
    transform: translateX(20px);
  }
`;
