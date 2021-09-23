import React,{useState} from 'react';
import SavedJobCard from '../partials/SavedJobCard';
import SaveJobForm from '../Forms/SavedJobForm';

function ListSavedJobs({savedJobs}) {
  const [modalState, setModalState] = useState(false);
  const onClose = () => {
    setModalState(false);
  };
  const showModal = () => {
    setModalState(true);
  }
  return (
    <div>
    <div className="d-flex justify-content-between align-items-center">
      <h1>Saved Jobs</h1>
      <button className="btn btn-primary" onClick={showModal}>Add to Jobs</button>
    </div>
      {savedJobs.map((item,i)=>{
        return <SavedJobCard key={i} jobInfo={item}/>
      })}
      <SaveJobForm modalState={modalState} onClose={onClose}/>
    </div>
  );
}

export default ListSavedJobs;
