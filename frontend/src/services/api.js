import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const signUp = (formData) => API.post('/signup', formData);
export const logIn = (formData) => API.post('/login', formData);
// export const extractData = (formData) => API.post('/extract', formData);
export const searchReport = (searchData) => API.post('/search', searchData);
export const getCompanies = () => API.get('/api/companies');
export const extractData = (formData) => {
  return new Promise((resolve, reject) => {
    API.post('/extract', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => resolve(response.data))
    .catch(error => reject(error));
  });
};