import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { StyledTable } from './Table.styled';
import { Button } from '../';
import { useJobs } from '../../hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const techFilter = [
  'javascript',
  'html',
  'html5',
  'css3',
  'sass',
  'react',
  'redux',
  'angular',
  'node.js',
  'express.js',
  'git',
  'sql',
  'mysql',
  'postgresql',
  'nosql',
  'mongodb',
  'docker',
  'rest',
  'api',
  'bootstrap',
];

const Table = () => {
  const [markedJobs, setMarkedJobs] = useState(JSON.parse(localStorage.getItem('markedJobs')));
  const [isSorted, setIsSorted] = useState(false);
  const { info, getJobs, jobOffers, information, getNewPage, updateJob, sortResultsByField, deleteJobs, filterJob } =
    useJobs();

  const location = useLocation();
  const url = location.pathname === '/alljobs' ? 'api/jobs/alljobs' : 'api/jobs/latestsjobs';

  const removeJobs = (jobs) => {
    if (jobs.length < 1) return;
    deleteJobs(jobs);
    localStorage.setItem('markedJobs', JSON.stringify([]));
  };

  const markJob = (id) => {
    if (!markedJobs) localStorage.setItem('markedJobs', JSON.stringify([]));
    if (!markedJobs?.includes(id)) {
      localStorage.setItem('markedJobs', JSON.stringify([...markedJobs, id]));
      setMarkedJobs([...markedJobs, id]);
    }
    if (markedJobs?.includes(id)) {
      const updatedMarkedJobs = markedJobs.filter((job) => job !== id);
      localStorage.setItem('markedJobs', JSON.stringify(updatedMarkedJobs));
      setMarkedJobs(updatedMarkedJobs);
    }
  };

  const changePage = (e) => {
    const direction = e.target.innerText.toLowerCase();
    getNewPage(information[direction].link);
  };

  const sort = (e) => {
    setIsSorted((prev) => !prev);
    sortResultsByField(e.target.innerText.toLowerCase(), isSorted);
  };

  const filterAppliedJobs = () => {
    filterJob('applied', true);
  };

  useEffect(() => {
    getJobs(url, location);
  }, [url]);
  return (
    <>
      {info?.msg ? (
        <StyledTable>
          <div className='error-container'>
            <h1 className='error'>{info?.msg}</h1>
            <Link to='/alljobs' className='link'>
              check all jobs list
            </Link>
          </div>
        </StyledTable>
      ) : (
        <>
          <StyledTable>
            <div>
              <Button onClick={filterAppliedJobs} text='APPLIED JOBS' />
              <Button onClick={() => getJobs(url, location)} text='REMOVE FILTER' />
            </div>
            {information && <p className='page'>Page {`${information.currentPage}/${information.pages}`}</p>}
            <table className='table'>
              <thead className='table-head'>
                <tr className='table-row'>
                  <th
                    className='header sortable'
                    onClick={(e) => {
                      sort(e);
                    }}
                  >
                    TITLE
                  </th>
                  <th
                    className='header sortable'
                    onClick={(e) => {
                      sort(e);
                    }}
                  >
                    COMPANY
                  </th>
                  <th className='header'>TECHS</th>
                  <th className='header'>JOB LINK</th>
                  <th
                    className='header sortable'
                    onClick={(e) => {
                      sort(e);
                    }}
                  >
                    APPLIED
                  </th>
                  <th
                    className='header sortable'
                    onClick={(e) => {
                      sort(e);
                    }}
                  >
                    DATE
                  </th>
                  <th
                    className='header'
                    onClick={(e) => {
                      sort(e);
                    }}
                  >
                    REMOVE
                  </th>
                </tr>
              </thead>
              <tbody className='table-body'>
                {jobOffers?.length &&
                  jobOffers?.map((job, i) => {
                    const techs = job.technologies.filter((item) => techFilter.includes(item));
                    return (
                      <tr className='table-row' key={i}>
                        <td className='cell' key={job.title}>
                          <p className='cell__content'>{job.title.toUpperCase()}</p>
                        </td>
                        <td className='cell' key={i}>
                          <p className='cell__content'>{job.company.toUpperCase()}</p>
                        </td>
                        <td className='cell' key={job.id}>
                          <p className='cell__content'>{techs.join(' - ').toUpperCase()}</p>
                        </td>
                        <td className='cell' key={job.job_link}>
                          <p className='cell__content'>
                            <a href={job.job_link}>Link</a>
                          </p>
                        </td>
                        <td
                          className='cell'
                          key={job.company}
                          onClick={() => {
                            updateJob(job.id, job.applied);
                          }}
                        >
                          <input className='checkbox' type='checkbox' defaultChecked={job.applied} />
                        </td>
                        <td className='cell' key={job.date}>
                          <p className='cell__content'>{job.date}</p>
                        </td>
                        <td
                          className='cell'
                          key={job.createdAt}
                          onChange={() => {
                            markJob(job.id);
                          }}
                        >
                          <input className='checkbox' type='checkbox' defaultChecked={markedJobs?.includes(job.id)} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            <div className='buttons'>
              {information?.previous && (
                <Button onClick={changePage} text='PREVIOUS' type='button' className='button' />
              )}
              {information?.next && <Button onClick={changePage} text='NEXT' type='button' className='button' />}
              <div>
                <button className='btn-red' onClick={() => removeJobs(markedJobs)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </div>
          </StyledTable>
        </>
      )}
    </>
  );
};

export default Table;
