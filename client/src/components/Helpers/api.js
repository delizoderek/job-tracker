import axios from 'axios';
const baseUrl = 'http://localhost:3005';

const API = {
  getJobList: function(){
    return axios.get(`${baseUrl}/jobs`);
  },
  saveJob: function(newJob){
    return axios.post(`${baseUrl}/save-job`,newJob);
  },
  addApp: function(newApp){
    return axios.post(`${baseUrl}/save-app`,newApp);
  },
  login: function(credentials){
    return axios.post(`${baseUrl}/auth/login`,credentials);
  }
};

export default API;
