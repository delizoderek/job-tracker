import { useReducer } from "react";
import {
  UPDATE_SAVED_JOBS,
  UPDATE_APP_JOBS,
  ADD_SAVED_JOB,
  ADD_APP_JOB,
  REMOVE_SAVED_JOB
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

    default:
      return state;
  }
};

export function useJobListReducer(initialState) {
  return useReducer(reducer, initialState)
}