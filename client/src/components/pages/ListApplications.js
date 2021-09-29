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
      <div className="d-flex flex-column align-items-center">
        <div className="col-10 d-flex p-2">
          <div className="col-1 fs-4 text-center">Job Id</div>
          <div className="col-3 fs-4 text-center border-start border-end">Position Title</div>
          <div className="col-3 fs-4 text-center">Company</div>
          <div className="col-2 fs-4 text-center border-start border-end">State</div>
          <div className="col-3 fs-4 text-center">Date Applied</div>
        </div>
        {appliedJobs.map((item,i)=>{
        return <JobAppCard key={i} jobInfo={item}/>
      })}
      </div>
      <ApplicationForm modalState={modalState} onClose={onClose}/>
    </>
  );
}

export default ListApplications;
