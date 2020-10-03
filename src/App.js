import React, {useState, useEffect} from 'react';
import './App.scss';
import Table from "./components/Table/Table";
import ContentContainer from "./components/ContentContainer/ContentContainer";
import axios from 'axios';
import Modal from './components/Modal/Modal';
import UserModal from './components/UserModal/UserModal';
import NewUserModal from './components/NewUserModal/NewUserModal';
import JobModal from './components/JobModal/JobModal';

const App = () => {

  const [users, setUsers] = useState([]);
 
  const [jobs, setJobs] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedJob, setSelectedJob] = useState([]);
  const [displayUserModal, setDisplayUserModal] = useState(false);
  const [displayJobModal, setDisplayJobModal] = useState(false);
  const [displayNewUserModal, setDisplayNewUserModal] = useState(false);
  

  const headers = ["Name", "Avatar", "Job Title", "Actions"];
  const headersJobs = ["Name Job", "Actions"];

  const getData = async (url, setter) => {
    try {
      const res = await axios.get(url);
      setter(res.data);
    }catch(err) {
      alert("Error getting data", err);
    }
  }

  const getUsers = async () => getData("https://5f518d325e98480016123ada.mockapi.io/api/v1/users", setUsers);
  const getJobs = async () => getData("https://5f518d325e98480016123ada.mockapi.io/api/v1/jobs", setJobs);

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
        <UserModal user={selectedUser} jobs={jobs} close={() => setDisplayUserModal(false)} users={users} setUsers={setUsers} />
        :
        null  
      }

      {
        displayJobModal ?
        <JobModal job={selectedJob} jobs={jobs} close={() => setDisplayJobModal(false)} setJobs={setJobs} />
        :
        null  
      }

      {
        displayNewUserModal ?
        <NewUserModal user={selectedUser} jobs={jobs} close={() => setDisplayNewUserModal(false)} sers={users} setUsers={setUsers} />
        :
        null  
      }

      <ContentContainer>
        <Table headers={headers}>
          {
            users.map(user => {
              const job = jobs.find(job => job.id == user.jobId) || {name: "Not Found"};
              return (
                <tr>
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
              )
            })
          }
        </Table>
      </ContentContainer>
      <ContentContainer>
        <Table headers={headersJobs}>
          {
            jobs.map(job=>{
              return(
                <tr>
                  <td>{job.name}</td>
                  <td>
                    <button
                      className="button-green"
                      onClick={() => editJob(job)}
                    >
                      Edit
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
