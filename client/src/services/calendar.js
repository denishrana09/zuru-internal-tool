import Axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { proxy } from '../config';

export const sendCode = (code, callback) => {
  const { token } = JSON.parse(reactLocalStorage.get('token', { token: 'token' }));
  const { id } = JSON.parse(reactLocalStorage.get('token', { id: 'id' }));

  Axios({
    method: 'post',
    url: `${proxy}/mail/getToken/${id}`,
    headers: {
      authorization: token,
    },
    data: {
      code,
    },
  })
    .then(res => callback(res))
    .catch(err => callback(err));
};

export const setEvent = (candidate, datetime, callback) => {
  const { token } = JSON.parse(reactLocalStorage.get('token', { token: 'token' })).token;

  Axios({
    method: 'put',
    url: `${proxy}/candidate/schedule/${candidate.candidateId}`,
    headers: {
      authorization: token,
    },
    data: {
      profileReviewStatus: "accepted",
      interviewDatetime: `${datetime}:00Z`,
    }
  })
    .then((response) => {
      Axios({
        method: 'put',
        url: `${proxy}/mail/setEvent`,
        headers: {
          authorization: token,
        },
        data: {
          profileReviewStatus: "accepted",
          id: candidate.candidateId,
          email: candidate.email,
          interviewDatetime: datetime,
          firstname: candidate.firstname,
          lastname: candidate.lastname,
          resumeUrl: candidate.resumeUrl,
          designation: candidate.designationName,
        },
      })
        .then(res => callback(res))
        .catch(err => callback(err))
    })
    .catch(err => callback(err))
};
