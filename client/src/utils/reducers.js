import { useReducer } from "react";
import {
  UPDATE_SAVED_JOBS,
  UPDATE_APP_JOBS,
  UPDATE_LOGIN,
  ADD_SAVED_JOB,
  ADD_APP_JOB,
  REMOVE_SAVED_JOB,
  SET_JWT
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SAVED_JOBS:
      return {
        ...state,
        savedJobs: [...action.savedJobs],
      };

    case UPDATE_APP_JOBS:
      return {
        ...state,
        appliedJobs: [...action.appliedJobs],
      };

    case ADD_SAVED_JOB:
      return {
        ...state,
        savedJobs: [...state.savedJobs,action.savedJob],
      };

    case ADD_APP_JOB:
      return {
        ...state,
        appliedJobs: [...state.appliedJobs,action.appliedJob],
      };

    case REMOVE_SAVED_JOB:
      let newState = state.savedJobs.filter(job => {
        return job._id !== action._id;
      });

      return {
        ...state,
        savedJobs: newState
      };

    case UPDATE_LOGIN:
      return{
        ...state,
        loggedIn: action.loggedIn,
      };
    case SET_JWT:
      return{
        ...state,
        jwt: action.jwt,
      };
    default:
      return state;
  }
};

export function useJobListReducer(initialState) {
  return useReducer(reducer, initialState)
}