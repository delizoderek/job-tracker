import React, {useState} from 'react';
import { useJobContext } from '../../utils/GlobalState';
import JobAppCard from '../partials/JobAppCard';
import ApplicationForm from '../Forms/ApplicationForm';

function ListApplications() {
  const [modalState, setModalState] = useState(false);
  const [state] = useJobContext();
  const {listApps} = state;
  const onClose = () => {
    setModalState(false);
  };
  const showModal = () => {
    setModalState(true);
  }
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Applications Submitted</h1>
        <button className="btn btn-primary" onClick={showModal}>Add Application</button>
      </div>
      {listApps.map((item,i)=>{
        return <JobAppCard key={i} jobInfo={item}/>
      })}
      <ApplicationForm modalState={modalState} onClose={onClose}/>
    </div>
  );
}

export default ListApplications;
