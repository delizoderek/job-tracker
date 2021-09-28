import React, { createContext, useContext } from "react";
import { useJobListReducer } from './reducers'

const JobContext = createContext();
const { Provider } = JobContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useJobListReducer({
    savedJobs: [],
    appliedJobs: [],
    loggedIn: false,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useJobContext = () => {
  return useContext(JobContext);
};

export { StoreProvider, useJobContext };