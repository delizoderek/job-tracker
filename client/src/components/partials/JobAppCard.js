import React from "react";

function JobAppCard({ jobInfo }) {
  const appDate = new Date(jobInfo.dateSubmitted);
  return (
    <a className="d-flex p-2" href={jobInfo.appLink || "#"} target="_blank" rel="noreferrer">
      <h3>{jobInfo.appId}</h3>
      <h3>{jobInfo.jobTitle}</h3>
      <h3>{jobInfo.company}</h3>
      <h3>{jobInfo.processState}</h3>
      <h3>{appDate.toString()}</h3>
    </a>
  );
}

export default JobAppCard;
