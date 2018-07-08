import Axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { proxy } from '../config';

export const getExpertise = (callback) => {
  const { token } = JSON.parse(reactLocalStorage.get('token', { token: 'token' }));
  Axios({
    method: 'get',
    url: `${proxy}/expertise`,
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      const expertise = res.data.data;
      return callback(expertise);
    });
};
