import Axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { proxy } from '../config';

export const getDesignation = (callback) => {
  const { token } = JSON.parse(reactLocalStorage.get('token', { token: 'token' }));
  Axios({
    method: 'get',
    url: `${proxy}/designation`,
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      const designation = res.data.data;
      return callback(designation);
    })
    .catch(err => callback(err));
};
