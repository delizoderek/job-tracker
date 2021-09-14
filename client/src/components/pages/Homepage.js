import React,{useState,useEffect} from 'react';
import API from '../utils/api';

const Homepage = () => {
  const [savedJobs,setSavedJobs] = useState([]);
  const [appliedJobs,setAppliedJobs] = useState([]);
  useEffect(() => {
    API.getJobList().then((resp) => {
      const {allSaved,allApps,message} = resp.data;
      if(message){
        console.error(message);
      } else {
        setSavedJobs([...allSaved]);
        setAppliedJobs([...allApps]);
      }
    });
  },[])
  return (
    <div className="col-12 d-flex flex-sm-column">
      <h1>Saved Jobs</h1>
      {savedJobs.map((item) => {
        return <p>{item.jobTitle}</p>
      })}
      <h1>Applied Jobs</h1>
      {appliedJobs.map((item) => {
        return <p>{item.jobTitle}</p>
      })}
    </div>
  );
};

export default Homepage;
