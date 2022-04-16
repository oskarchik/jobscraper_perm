import styled from 'styled-components';

export const StyledNavbar = styled.nav`
  padding: 10px;
  .menu {
    list-style: none;
    padding: 0;
    margin-right: 10px;
    display: flex;
    justify-content: space-between;

    .menu-item {
      padding-left: 20px;
      .link {
        text-decoration: none;
        color: inherit;
        ${'' /* font-size: 1.5em; */}
        font-size: clamp(0.7rem, 1rem, 1.5rem);
        ${'' /* font-size: clamp(1em, 1.5vw, 2em); */}
        font-weight: bold;
        margin: 0;
        cursor: pointer;
      }
    }
  }
`;
