import axios from 'axios'

export const initAxios = ({ baseURL }) => {
  axios.interceptors.request.use(function (config) {
    config.baseURL = baseURL
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
}

export default axios