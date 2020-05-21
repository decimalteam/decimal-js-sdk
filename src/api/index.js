import axios from 'axios';

export default function DecimalApi(baseURL) {
  const options = {};
  options.baseURL = baseURL;

  if (!options.baseURL) {
    throw new Error('Invalid baseURL');
  }

  const instance = axios.create(options);

  return instance;
}
