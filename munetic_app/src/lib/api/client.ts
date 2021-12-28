import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3030',
});

export default client;
