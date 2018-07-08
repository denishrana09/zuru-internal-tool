import Axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { proxy } from '../config';

export const getRoles = (callback) => {
  const { token } = JSON.parse(reactLocalStorage.get('token', { token: 'token' }));
  Axios({
    method: 'get',
    url: `${proxy}/role`,
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      const designation = res.data.data;
      return callback(designation);
    });
};
