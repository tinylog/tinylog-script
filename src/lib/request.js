import axios from 'axios'

axios.interceptors.request.use(function (config) {
  config.baseURL = 'https://tinylog.ruiming.me'
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default axios