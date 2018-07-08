import Axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { proxy } from '../config';

export const loginAuth = (state, callback) => {
  Axios({
    method: 'post',
    url: `${proxy}/auth/login`,
    data: {
      email: state.email,
      password: state.password,
    },
  })
    .then((res) => {
      const { token } = res.data.data.loginResponse;
      const role = res.data.data.loginResponse.profile.roleId;
      const code = res.status;
      const { id } = res.data.data.loginResponse.profile;

      // if (res.status === 200) {
      reactLocalStorage.setObject('token', { token, id });
      return callback({ status: true, role, code });
      // }
    })
    .catch(err => {
        if (err.response) {
            return callback(err.response)
        }
    });
};

export default loginAuth;
