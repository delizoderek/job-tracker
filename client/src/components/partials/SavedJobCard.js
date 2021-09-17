import React from 'react';

function SavedJobCard({jobInfo}){
  return(
    <a className="d-flex p-2" href={jobInfo.appLink || "#"} target="_blank" rel="noreferrer">
        <h3>{jobInfo.jobTitle}</h3>
        <h3>{jobInfo.company}</h3>
        <h3>{jobInfo.dateAdded}</h3>
    </a>
  );
}

export default SavedJobCard;
