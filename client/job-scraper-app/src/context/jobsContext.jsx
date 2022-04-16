import { createContext, useReducer, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import { useAuth, useAxiosPrivate } from '../hooks';

import { jobReducer, initialState } from '../reducers/jobsReducer';

const JobsContext = createContext();

const ACTIONS = {
  GET_JOB: 'GET_JOB',
  FETCH_NEW_PAGE: 'FETCH_NEW_PAGE',
  SEARCH_JOB: 'SEARCH_JOB',
  UPDATE_JOB: 'UPDATE_JOB',
  SORT_RESULTS: 'SORT_RESULTS',
  DELETE_JOB: 'DELETE_JOB',
};

export const JobsProvider = ({ children }) => {
  const { user } = useAuth();
  // const { axiosPrivate } = useAxiosPrivate();
  const [state, dispatch] = useReducer(jobReducer, initialState);

  const getJobs = async (url, location) => {
    const controller = new AbortController();

    try {
      const response = await axiosPrivate.get(url, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });

      return dispatch({ type: ACTIONS.GET_JOB, payload: response.data });
    } catch (error) {
      Navigate('/alljobs', { state: { from: location }, replace: true });
    }
    return state;
  };

  const getNewPage = async (url) => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(url, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });

      controller.abort();
      return dispatch({ type: ACTIONS.FETCH_NEW_PAGE, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  const filterJob = async (field, word) => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(`/api/jobs/filter/${field}/${word}?`, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      controller.abort();
      return dispatch({ type: ACTIONS.SEARCH_JOB, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const updateJob = async (id, condition) => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.put(`/api/jobs/${id}`, {
        applied: !condition,
      });
      controller.abort();
      return dispatch({ type: ACTIONS.UPDATE_JOB, payload: response.data.job });
    } catch (error) {
      console.error(error);
    }
  };

  const sortResultsByField = (field, isSorted) => {
    dispatch({ type: ACTIONS.SORT_RESULTS, payload: { field, isSorted } });
  };

  const deleteJobs = async (jobs) => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.delete(`/api/jobs/`, {
        data: { jobs },
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      controller.abort();
      return dispatch({ type: ACTIONS.DELETE_JOB, payload: jobs });
    } catch (error) {
      console.log(error);
    }
  };

  const [jobs, setJobs] = useState(null);
  const [info, setInfo] = useState(null);

  const value = {
    jobOffers: state.jobs,
    information: state.info,
    jobs: jobs,
    setJobs: setJobs,
    info: info,
    setInfo,
    getJobs,
    state: state,
    getNewPage,
    filterJob,
    updateJob,
    sortResultsByField,
    deleteJobs,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};

export default JobsContext;
