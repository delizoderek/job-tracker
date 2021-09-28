import React,{useState,useEffect} from 'react';
import {useJobContext} from '../../utils/GlobalState';
import {UPDATE_APP_JOBS,UPDATE_SAVED_JOBS} from '../../utils/actions'
import API from '../Helpers/api';
import Navbar from '../UI/Navbar';
import ListSavedJobs from './ListSavedJobs';
import ListApplications from './ListApplications';

const Homepage = () => {
  const [_,dispatch] = useJobContext();
  const [currentTab,setCurrentTab] = useState('Saved Jobs');

  const renderTab = () => {
    if(currentTab === "Applications"){
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
      <Navbar currentTab={currentTab} handleTabChange={handleTabChange} tabNames={['Saved Jobs','Applications']}/>
      {renderTab()}
    </div>
  );
};

export default Homepage;
