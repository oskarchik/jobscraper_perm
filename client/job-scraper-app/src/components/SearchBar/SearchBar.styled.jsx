import styled from 'styled-components';

export const StyledSearchBar = styled.form`
  ${'' /* display: block; */}

  width: 70%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
  .search__input {
    width: 50%;
    height: 30px;
    background: ${({ theme }) => theme.backgroundColor};
    border: 0;
    border-bottom: 1px solid ${({ theme }) => theme.fontColor};
    border-radius: 5px 5px 0 0;
    outline: none;
    font-size: 16px;
    color: ${({ theme }) => theme.fontColor};
    text-transform: uppercase;
  }
  .search__input::placeholder {
    color: ${({ theme }) => theme.fontColor};
  }
  .search__select {
    display: block;
    height: 30px;
    border: none;
    background: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.fontColor};
    outline: none;
    font-size: 16px;

    .option {
      display: block;
    }
  }
  .button {
    min-height: 30px;
    padding: 0 10px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    letter-spacing: 1.5px;
    background-color: ${({ theme }) => theme.actionColor};
    color: ${({ theme }) => theme.whiteColor};
    cursor: pointer;
    font-size: 20px;
  }
  .button:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
`;
