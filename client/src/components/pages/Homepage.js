import React, { useState, useEffect } from "react";
import { useJobContext } from "../../utils/GlobalState";
import { UPDATE_LOGIN } from "../../utils/actions";
import API from "../Helpers/api";
import Navbar from "../UI/Navbar";
import ListSavedJobs from "./ListSavedJobs";
import ListApplications from "./ListApplications";
import Auth from "../Helpers/AuthService";

const Homepage = () => {
  const [_,dispatch] = useJobContext();
  const [currentTab, setCurrentTab] = useState("Saved Jobs");
  const renderTab = () => {
    if (currentTab === "Applications") {
      return <ListApplications />;
    } else {
      return <ListSavedJobs />;
    }
  };
  const handleTabChange = (tab) => setCurrentTab(tab);

  useEffect(()=>{
    if(Auth.userLoggedIn()){
      dispatch({
        type:UPDATE_LOGIN,
        loggedIn: true
      });
      
    }
  });

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
