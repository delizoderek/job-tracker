// see SignupForm.js for comments
import React, { useState } from 'react';
import { useJobContext } from "../../utils/GlobalState";
import { UPDATE_APP_JOBS, UPDATE_SAVED_JOBS, UPDATE_LOGIN, SET_JWT} from "../../utils/actions";
import API from "../Helpers/api";
import {validateEmail} from "../Helpers/InputValidation";

import Auth from '../Helpers/AuthService';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [state, dispatch] = useJobContext();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (validateEmail(userFormData.email)) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log(userFormData);
    try {
      const userResp = await API.login(userFormData);
      const {token,user} = userResp.data;
      console.log(user);
      if(user.savedJobs.length > 0){
        dispatch({
          type: UPDATE_SAVED_JOBS,
          savedJobs: user.savedJobs,
        })
      }

      if(user.jobsApplied.length > 0){
        dispatch({
          type: UPDATE_APP_JOBS,
          jobsApplied: user.jobsApplied,
        })
      }

      dispatch({
        type: UPDATE_LOGIN,
        loggedIn: true,
      });
      dispatch({
        type: SET_JWT,
        jwt: token, 
      })
      Auth.login(token);
    } catch (err) {
      console.log(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {/* <div className={showAlert ? "alert alert-warning alert-dismissible fade show" : "alert alert-warning alert-dismissible fade"} role="alert">
          <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          <button type="button" className="btn-close" onClick={() => setShowAlert(false)} aria-label="Close"></button>
        </div> */}
        <div className='form-floating'>
          <input
            type='email'
            placeholder='name@example.com'
            name='email'
            className= {validateEmail(userFormData.email) ? 'form-control' : 'form-control is-invalid'}
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className='form-floating'>
          <input
            type='password'
            placeholder='Your password'
            name='password'
            className='form-control'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <label htmlFor='password'>Password</label>
        </div>
        <input
          className='btn btn-outline-primary'
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'/>
      </form>
    </>
  );
};

export default LoginForm;