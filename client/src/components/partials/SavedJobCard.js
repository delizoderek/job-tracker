import React from 'react';

function SavedJobCard({jobInfo}){
  console.log(jobInfo);
  const date = new Date(jobInfo.dateAdded);
  return(
    <div className="col-7 d-flex p-2">
        <div className="col-4 fs-4"><a href={jobInfo.appLink || "#"} target="_blank" rel="noreferrer">{jobInfo.jobTitle}</a></div>
        <div className="col-4 fs-4 text-center">{jobInfo.company}</div>
        <div className="col-4 text-center">
          <input type='checkbox'/>
        </div>
    </div>
  );
}

export default SavedJobCard;
