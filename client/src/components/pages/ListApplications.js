import React from 'react';
import JobAppCard from '../partials/JobAppCard';

function ListApplications({listApps}) {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Applications Submitted</h1>
        <button className="btn btn-primary">Add Application</button>
      </div>
      {listApps.map((item,i)=>{
        return <JobAppCard key={i} jobInfo={item}/>
      })}
    </div>
  );
}

export default ListApplications;
