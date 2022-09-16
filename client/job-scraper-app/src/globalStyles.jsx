import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
*{
    font-size: clamp(1rem, 1.7vw + 0.3rem, 1.3125rem);
}
h2{
    font-size: 2.25rem;
}
body{
    background: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.fontColor};
    font-family:  sans-serif;
}
`;
