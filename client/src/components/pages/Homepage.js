import React, { useState, useEffect } from "react";
import { useJobContext } from "../../utils/GlobalState";
import {
  SET_JWT,
  UPDATE_APP_JOBS,
  UPDATE_LOGIN,
  UPDATE_SAVED_JOBS,
} from "../../utils/actions";
import Navbar from "../UI/Navbar";
import ListSavedJobs from "./ListSavedJobs";
import ListApplications from "./ListApplications";
import Auth from "../Helpers/AuthService";
import API from "../Helpers/api";

const Homepage = () => {
  const [state, dispatch] = useJobContext();
  const [currentTab, setCurrentTab] = useState("Saved Jobs");
  const renderTab = () => {
    if (currentTab === "Applications") {
      return <ListApplications />;
    } else {
      return <ListSavedJobs />;
    }
  };
  const handleTabChange = (tab) => setCurrentTab(tab);

  useEffect(() => {
    console.log('is this running to much?');
    const setDispatch = async () => {
      dispatch({
        type: UPDATE_LOGIN,
        loggedIn: true,
      });
      dispatch({
        type: SET_JWT,
        jwt: Auth.getToken(),
      });
    }
    if (Auth.userLoggedIn()) {
      setDispatch();
    } else {
      if(Auth.isTokenExpired()){
        Auth.clearToken();
      }
    }
  }, [dispatch]);

  useEffect(() => {
    console.log('is this running to much?');
    const loadData = async () => {
      try {
        const jobs = await API.getJobList(state.jwt);
        const { allSaved, allApps } = jobs.data;
        if (allSaved.length > 0) {
          dispatch({
            type: UPDATE_SAVED_JOBS,
            savedJobs: allSaved,
          });
        }
        if (allApps.length > 0) {
          dispatch({
            type: UPDATE_APP_JOBS,
            appliedJobs: allApps,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (state.jwt !== "") {
      loadData();
    }
  }, [state.jwt,dispatch]);

  return (
    <div className="w-100 p-2">
      <Navbar
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        tabNames={["Saved Jobs", "Applications"]}
      />
      {renderTab()}
    </div>
  );
};

export default Homepage;
