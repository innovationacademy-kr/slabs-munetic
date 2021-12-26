import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:4242',
});

export default client;
