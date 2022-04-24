import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
*{
    font-size: clamp(1em, 2vw, 2em); 
}
h2{
    font-size: 36px;
}
body{
    background: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.fontColor};
    font-family:  sans-serif;
}
`;
