import axios from 'axios';
const baseUrl = 'http://localhost:3005';

const API = {
  getJobList: function(){
    return axios.get(`${baseUrl}/jobs`);
  }
};

export default API;
