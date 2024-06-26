import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true; 
axios.defaults.withXSRFToken = true; 
axios.defaults.xsrfCookieName = 'XSRF-TOKEN'; 
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'; 

export default axios;