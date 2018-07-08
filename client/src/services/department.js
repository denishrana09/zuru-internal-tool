import Axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { proxy } from '../config';

export const getDepartments = (callback) => {
  const { token } = JSON.parse(reactLocalStorage.get('token', { token: 'token' }));
  Axios({
    method: 'get',
    url: `${proxy}/department`,
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      const department = res.data.data;
      return callback(department);
    });
};
