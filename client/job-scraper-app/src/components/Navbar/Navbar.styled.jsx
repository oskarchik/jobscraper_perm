import styled from 'styled-components';

export const StyledNavbar = styled.nav`
  padding-right: 20px;
  .menu {
    list-style: none;
    margin-right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .menu-item {
      padding-left: 20px;

      .link {
        text-decoration: none;
        color: inherit;
        font-size: clamp(0.7rem, 1rem, 1.5rem);
        font-weight: bold;
        margin: 0;
        cursor: pointer;
      }
    }
  }
`;
