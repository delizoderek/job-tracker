import React,{useState} from 'react';
import SavedJobCard from '../partials/SavedJobCard';
import Modal from '../interactions/Modal';

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
      <Modal isActive={modalState} onClose={onClose} title="Add Job">
        <h1>Hello from this modal</h1>
      </Modal>
    </div>
  );
}

export default ListSavedJobs;
