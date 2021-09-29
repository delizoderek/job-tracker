import React from "react";

function JobAppCard({ jobInfo }) {
  const appDate = new Date(jobInfo.dateSubmitted);
  return (
    <div className="col-10 d-flex p-2">
      <div className="col-1 fs-4 text-center">{jobInfo.appId}</div>
      <div className="col-3 fs-4 text-center"><a href={jobInfo.appLink || "#"} target="_blank" rel="noreferrer">{jobInfo.jobTitle}</a></div>
      <div className="col-3 fs-4 text-center">{jobInfo.company}</div>
      <div className="col-2 fs-4 text-center">{jobInfo.processState}</div>
      <div className="col-3 fs-4 text-center">{appDate.toLocaleDateString("en-US")}</div>
    </div>
  );
}

export default JobAppCard;
