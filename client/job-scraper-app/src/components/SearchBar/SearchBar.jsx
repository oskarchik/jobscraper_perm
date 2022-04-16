import { StyledSearchBar } from './SearchBar.styled';
import { useJobs } from '../../hooks';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../';

const SearchBar = () => {
  const { jobs, filterJob } = useJobs();

  const inputRef = useRef();
  const selectRef = useRef();

  const [field, setField] = useState('');
  const [word, setWord] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    filterJob(field, word);
  };
  const onInputChange = (e) => {
    e.target.type === 'text' ? setWord(e.target.value) : setField(e.target.value);
  };

  const filterResults = (e) => {
    const filtered = jobs?.rows?.filter((job) => Object.values(job).includes(e.target.value));
    setFilteredJobs((prev) => [...prev, filtered]);
  };
  useEffect(() => {
    setField(selectRef.current.value);
  }, [selectRef]);

  return (
    <StyledSearchBar onSubmit={(e) => handleSubmit(e)}>
      <input
        className='search__input'
        onChange={(e) => {
          onInputChange(e);
          filterResults(e);
        }}
        ref={inputRef}
        type='text'
        placeholder='FILTER PAGE RESULTS...'
      />
      <select
        className='search__select'
        onChange={onInputChange}
        ref={selectRef}
        type='select'
        name='search__option'
        id='jobTitle'
        defaultValue={'title'}
      >
        <option className='option' value='title'>
          TITLE
        </option>
        <option className='option' value='company'>
          COMPANY
        </option>
        <option className='option' value='technology'>
          TECHNOLOGY
        </option>
      </select>

      <Button className='button' type='submit' text='SEARCH IN DATABASE' />
    </StyledSearchBar>
  );
};

export default SearchBar;
