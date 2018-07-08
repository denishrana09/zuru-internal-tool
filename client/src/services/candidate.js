import Axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { proxy } from '../config';

const link = [];

export const getSignedUrl = function (name, file, callback) {
    // auth token
    const token = JSON.parse(reactLocalStorage.get('token', { token: 'token' })).token;

    Axios({
        url: `${proxy}/signedUrl/` + name,
        headers: {
            authorization: token,
        },
        method: 'post',
        data: {
            type: file.type,
            file
        },
    })
        .then((res) => {
            const sessionUri = res.data.uri;
            const publicLink = res.data.publicLink;
            callback(name, file, sessionUri,publicLink);
        })
        .catch(err => {
            console.log('DEBUG', err);
            callback(err)
        });
};


export const sendCandidateInfo = function (candidate, callback) {
    // auth token
    const token = JSON.parse(reactLocalStorage.get('token', { token: 'token' })).token;

    let promise = new Promise((resolve) => {
        resolve(true);
    });

    promise
        // picture public url
        .then(() => uploadData(candidate.signedPictureLink, candidate.pictureFile))
        // resume public url
        .then(() => uploadData(candidate.signedResumeLink, candidate.resumeFile))
        // post request for candidate
        .then(() =>
            Axios({
                method: 'post',
                url: `${proxy}/candidate`,
                headers: {
                    authorization: token,
                },
                data: {
                    firstname: candidate.firstname,
                    middlename: candidate.middlename,
                    lastname: candidate.lastname,
                    email: candidate.email,
                    mobile: candidate.mobile,
                    experience: candidate.experience,
                    designationId: candidate.position,
                    pictureUrl: candidate.picture,
                    resumeUrl: candidate.resume,
                    referrerName: candidate.reference,
                    currentEmployer: candidate.currentCompeny,
                    expertiseArray: candidate.expertise,
                    interviewerArray: candidate.interviewer,
                },
            })
                .then(res => callback(res))
                .catch(err => callback(err)),
        )
        .catch(err => callback(err));
};


// upload the data and push public url to link array
export const uploadData = function (uri, file) {

    return Axios({
        url: uri,
        method: 'POST',
        data: file,
    })
        .then( res => {
            link.push(res.data.media);
            console.log(res.data.media);
            return res.data.media;
        }
    )
        .catch(err => console.log(err));
};


export const getCandidates = function (callback) {
    const token = JSON.parse(reactLocalStorage.get('token', { token: 'token' })).token;

    Axios({
        method: 'get',
        url: 'http://localhost:3001/candidate',
        headers: {
            authorization: token,
        },
    })
        .then(res => callback(res.data.data))
        .catch(err => callback(err));
};

export const getCandidateDataById = function (id, callback) {
    const token = JSON.parse(reactLocalStorage.get('token', { token: 'token' })).token;

    Axios({
        method: 'get',
        url: `${proxy}/candidate/${id}`,
        headers: {
            authorization: token,
        },
    })
        .then((res) => { callback(res.data.data); })
        .catch(err => callback(err));
};

export const getCandidateExpertiseById = function (id, callback) {
    const token = JSON.parse(reactLocalStorage.get('token', { token: 'token' })).token;
console.log(`${proxy}/canExpertise/${id}`)
    Axios({
        method: 'get',
        url: `${proxy}/canExpertise/${id}`,
        headers: {
            authorization: token,
        },
    })
        .then((res) => { console.log(res); callback(res.data.data) })
        .catch(err => callback(err));

};


export const getEmployeeByCandidate = function (id, callback) {
    const token = JSON.parse(reactLocalStorage.get('token', { token: 'token' })).token;

    Axios({
        method: 'get',
        url: `${proxy}/candidate/interviewer/${id}`,
        headers: {
            authorization: token,
        },
    })
        .then(res => callback(res.data.data))
        .catch(err => callback(err));
};

export const calenedarDate = function (callback) {
    const token = JSON.parse(reactLocalStorage.get('token', { token: 'token' })).token;

    Axios({
        method: 'get',
        url: `${proxy}/mail/getUrl`,
        headers: {
            authorization: token,
        },
    })
        .then(res => callback(res))
        .catch(err => callback(err));
};

export const updateReviewStatus = function (candidate) {
    const token = JSON.parse(reactLocalStorage.get('token', { token: 'token' })).token;
    const id = JSON.parse(reactLocalStorage.get('token', { id: 'id' })).id;
    Axios({
        method: 'put',
        url: `${proxy}/employee/${id}/candidate/${candidate.id}/review`,
        headers: {
            authorization: token
        },
        data: {
            status: candidate.status,
            remarks: candidate.remark
        }
    })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export const getCandidateByEmployeeId = function (callback) {
    const { token } = JSON.parse(reactLocalStorage.get('token', { token: 'token' }));
    const { id } = JSON.parse(reactLocalStorage.get('token', { id: 'id' }));

    Axios({
        method: 'get',
        url: `${proxy}/employee/candidate/${id}`,
        headers: {
            authorization: token
        }
    })
        .then(res => callback(res.data.data.candidatesProfileResult))
        .catch(err => callback(err))
}

export const rejectCandidate = function(candidate , callback){
    const { token } = JSON.parse(reactLocalStorage.get('token', { token: 'token' }));

    Axios({
        method:'put',
        url:`${proxy}/candidate/reject/${candidate}`,
        headers:{
            authorization: token
        },
        data:{
            id:candidate.candidateId
        }
    })
    .then(res=>console.log(res))
    .catch(err => console.log(err))
}