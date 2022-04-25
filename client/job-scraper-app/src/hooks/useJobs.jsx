import { useContext } from 'react';
import JobsContext from '../context/jobsContext';

export const useJobs = () => {
  return useContext(JobsContext);
};
