import { StyledTAblePage } from './TablePage.styled';
import { Table, SearchBar } from '../../components';
const TablePage = ({ title }) => {
  return (
    <StyledTAblePage className='all-jobs'>
      <h2 className='title'>{title}</h2>
      <SearchBar />
      <Table />
    </StyledTAblePage>
  );
};

export default TablePage;
