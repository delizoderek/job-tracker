import React, {useState} from 'react';
import { useJobContext } from '../../utils/GlobalState';
import JobAppCard from '../partials/JobAppCard';
import ApplicationForm from '../Forms/ApplicationForm';

function ListApplications() {
  const [modalState, setModalState] = useState(false);
  const [state] = useJobContext();
  const {appliedJobs} = state;
  const onClose = () => {
    setModalState(false);
  };
  const showModal = () => {
    setModalState(true);
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Applications Submitted</h1>
        <button className="btn btn-primary" onClick={showModal}>Add Application</button>
      </div>
      {appliedJobs.map((item,i)=>{
        return <JobAppCard key={i} jobInfo={item}/>
      })}
      <ApplicationForm modalState={modalState} onClose={onClose}/>
    </>
  );
}

export default ListApplications;
