import axios from 'axios';
const baseUrl = 'https://dd-job-apps.herokuapp.com';
const token = localStorage.getItem('id_token');
const API = {
  getJobList: function(tko){
    return axios.get(`${baseUrl}/jobs`,{headers:{authorization:tko}});
  },
  saveJob: function(newJob){
    return axios.post(`${baseUrl}/save-job`,newJob,{headers:{authorization:token}});
  },
  addApp: function(newApp){
    return axios.post(`${baseUrl}/save-app`,newApp,{headers:{authorization:token}});
  },
  login: function(credentials){
    return axios.post(`${baseUrl}/auth/login`,credentials);
  }
};

export default API;
