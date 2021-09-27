import React,{useState,useEffect} from 'react';
import {useJobContext} from '../../utils/GlobalState';
import {UPDATE_APP_JOBS,UPDATE_SAVED_JOBS} from '../../utils/actions'
import API from '../utils/api';
import Tabs from '../UI/Tabs';
import ListSavedJobs from './ListSavedJobs';
import ListApplications from './ListApplications';

const Homepage = () => {
  const [dispatch] = useJobContext();
  const [currentTab,setCurrentTab] = useState('Saved');

  const renderTab = () => {
    if(currentTab === "Applied"){
      return <ListApplications/>;
    } else {
      return <ListSavedJobs/>;
    }
  }

  const handleTabChange = (tab) => setCurrentTab(tab);

  useEffect(() => {
    API.getJobList().then((resp) => {
      const {allSaved,allApps,message} = resp.data;
      if(message){
        console.error(message);
      } else {
        dispatch({
          type: UPDATE_SAVED_JOBS,
          savedJobs: allSaved,
        });
        dispatch({
          type: UPDATE_APP_JOBS,
          appliedJobs: allApps,
        });
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
