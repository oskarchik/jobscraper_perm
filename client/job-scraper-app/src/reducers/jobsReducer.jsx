const initialState = {
  jobs: {},
  info: {},
  msg: {},
};

const jobReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_JOB':
      return { ...state, info: payload.info, jobs: payload.results?.jobs?.rows, msg: payload.msg };

    case 'SEARCH_JOB':
      return { ...state, info: payload.info, jobs: payload.results.jobs.rows, msg: payload.msg };

    case 'DELETE_JOB':
      const filteredJobs = state.jobs.filter((job) => {
        return payload.indexOf(job.id) < 0;
      });
      return { ...state, jobs: filteredJobs };

    case 'UPDATE_JOB':
      return { ...state, jobs: [...state.jobs, payload] };

    case 'FETCH_NEW_PAGE':
      return { ...state, info: payload.info, jobs: payload.results.jobs.rows };

    case 'SORT_RESULTS':
      const { field, isSorted } = payload;
      const sortByField = (field) => (a, b) => a[field] > b[field] ? 1 : -1;
      const sorted = state.jobs.slice().sort(sortByField(field));
      if (isSorted) {
        sorted.reverse();
      }
      return { ...state, jobs: sorted };

    default:
      return state;
  }
};

export { initialState, jobReducer };
