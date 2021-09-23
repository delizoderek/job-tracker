import React,{useState,useEffect} from 'react';
import API from '../utils/api';
import Tabs from '../UI/Tabs';
import ListSavedJobs from './ListSavedJobs';
import ListApplications from './ListApplications';

const Homepage = () => {
  const [savedJobs,setSavedJobs] = useState([]);
  const [appliedJobs,setAppliedJobs] = useState([]);
  const [currentTab,setCurrentTab] = useState('Saved');

  const renderTab = () => {
    if(currentTab === "Applied"){
      return <ListApplications listApps={appliedJobs}/>;
    } else {
      return <ListSavedJobs savedJobs={savedJobs}/>;
    }
  }

  const handleTabChange = (tab) => setCurrentTab(tab);

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
    <div className="w-100 p-2">
      <Tabs currentTab={currentTab} handleTabChange={handleTabChange}/>
      {renderTab()}
    </div>
  );
};

export default Homepage;
