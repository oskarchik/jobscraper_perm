import { StyledTAblePage } from './TablePage.styled';
import { Table, SearchBar, Toast, Header } from '../../components';
import { useToast } from '../../hooks';
const TablePage = ({ title }) => {
  const { notification } = useToast();
  return (
    <StyledTAblePage className='all-jobs'>
      <Header />
      {notification?.response && <Toast />}
      <h2 className='title'>{title}</h2>
      <SearchBar />
      <Table />
    </StyledTAblePage>
  );
};

export default TablePage;
