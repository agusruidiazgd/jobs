import React, {useState, useEffect, useReducer} from 'react';
import './App.scss';
import Table from "./components/Table/Table";
import ContentContainer from "./components/ContentContainer/ContentContainer";
import axios from 'axios';
import UserModal from './components/UserModal/UserModal';
import NewUserModal from './components/NewUserModal/NewUserModal';
import JobModal from './components/JobModal/JobModal';
import {ACTION_GET, reducer} from './reducers/reducerUser';
import {ACTION_GET_JOB, ACTION_EDIT_JOB,ACTION_DELETE_JOB, reducerJob} from './reducers/reducerJobs';

const App = () => {

  const [users, dispatchUsers] = useReducer(reducer, []);
  const [jobs, dispatchJobs] = useReducer(reducerJob, []);
  
  const [selectedUser, setSelectedUser] = useState();
  const [selectedJob, setSelectedJob] = useState([]);

  const [displayUserModal, setDisplayUserModal] = useState(false);
  const [displayJobModal, setDisplayJobModal] = useState(false);
  const [displayNewUserModal, setDisplayNewUserModal] = useState(false);
  

  const headers = ["Name", "Avatar", "Job Title", "Actions"];
  const headersJobs = ["Name Job", "Actions"];

  const getData = async (url, dispatch, actionType) => {
    try {
      const resp = await axios.get(url);
      dispatch({type:actionType, payload: resp.data });
    }catch(err) {
      alert(err);
    }
  }
  

  const getUsers = async () => getData("https://5f518d325e98480016123ada.mockapi.io/api/v1/users", dispatchUsers, ACTION_GET );
  
  const getJobs = async () => getData("https://5f518d325e98480016123ada.mockapi.io/api/v1/jobs", dispatchJobs, ACTION_GET_JOB );

  const editUser = user => {
    setSelectedUser(user);
    setDisplayUserModal(true);
  }

  const editJob = job => {
    setSelectedJob(job);
    setDisplayJobModal(true);
  }

  const addUser = () =>{
    setDisplayNewUserModal(true);
  }

  const deleteJob = job =>{
    console.log("ver", job.id);
    axios.delete(`https://5f518d325e98480016123ada.mockapi.io/api/v1/jobs/${job.id}`)
    .then(res =>{
      console.log("jobs", res.data);
      dispatchJobs({type:ACTION_DELETE_JOB, payload:res.data});
    }).catch(err => console.log("error deleting data", err));
  }

  useEffect(() => getUsers(), []);
  useEffect(() => getJobs(), []);

  return (
    <React.Fragment>
      <header className="main-header">
        <h1>Jobs</h1>
      </header>

      <button className="button-green fixed" onClick={() => addUser()}>
        Add user +
      </button>

      {
        displayUserModal ?
        <UserModal user={selectedUser} jobs={jobs} close={() => setDisplayUserModal(false)} users={users} setUsers={dispatchUsers} />
        :
        null  
      } 

      { 
        displayJobModal ?
        <JobModal job={selectedJob} jobs={jobs} close={() => setDisplayJobModal(false)} setJobs={dispatchJobs} />
        :
        null  
      }

      {
        displayNewUserModal ?
        <NewUserModal user={selectedUser} jobs={jobs} close={() => setDisplayNewUserModal(false)} users={users} setUsers={dispatchUsers} />
        :
        null  
      }

      <ContentContainer>
        <Table headers={headers}>
          {
            users.map(user => {
              const job = jobs.find(job => job.id == user.jobId) || {name: "Not Found"};
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td><img className="avatar-img" src={user.avatar} /></td>
                  <td>{job.name}</td>
                  <td>
                    <button
                      className="button-green"
                      onClick={() => editUser(user)}
                    >
                        Edit
                      </button>
                  </td>
                </tr>
              );
            })
          }
        </Table>
      </ContentContainer>
      <ContentContainer>
        <Table headers={headersJobs}>
          {
            jobs.map(job=>{
              return(
                <tr key={job.id}>
                  <td>{job.name}</td>
                  <td>
                    <button
                      className="button-green"
                      onClick={() => editJob(job)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="button-green"
                      onClick={() => deleteJob(job)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>

              )
            })
          }
        </Table>
      </ContentContainer> 
    </React.Fragment>
  );
}

export default App;
