import React, { useState } from "react";
import { useJobContext } from "../../utils/GlobalState";
import SavedJobCard from "../partials/SavedJobCard";
import SaveJobForm from "../Forms/SavedJobForm";

function ListSavedJobs() {
  const [modalState, setModalState] = useState(false);
  const [state] = useJobContext();
  const { savedJobs } = state;
  const onClose = () => {
    setModalState(false);
  };
  const showModal = () => {
    setModalState(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Saved Jobs</h1>
        <button className="btn btn-primary" onClick={showModal}>
          Add to Jobs
        </button>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="col-7 d-flex p-2">
          <div className="col-4 fs-4 text-center">Position Title</div>
          <div className="col-4 fs-4 text-center border-start border-end">Company Name</div>
          <div className="col-4 fs-4 text-center">Application Submitted</div>
        </div>
        {savedJobs.map((item, i) => {
          return <SavedJobCard key={i} jobInfo={item} />;
        })}
      </div>
      <SaveJobForm modalState={modalState} onClose={onClose} />
    </>
  );
}

export default ListSavedJobs;
