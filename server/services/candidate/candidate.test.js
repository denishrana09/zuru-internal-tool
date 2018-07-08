const request = require('supertest-as-promised');
const app = require('../../app');
const genarateToken = require('../auth/auth.service')
const canSer = require('../candidate/candidate.service')

describe('POST /candidate/ - create new candidate', () => {
    const userData = {
        "firstname": "qwe",
        "lastname": "rty",
        "email": "zxc@gmail.com",
        "mobile": "9877899878",
        "designationId": "358479134289756161",
        "resumeUrl": "74144.pdf",
        "experience" : "5",
        "expertiseArray": ["359099645827317761"],
        "interviewerArray": ["358480028375678977"]
    }

    let dbuser = {
        "email" : "temp@gmail.com",
        "password": "temp123"
    };
   
    it('required validation testing', () => {
        const reqUserData = {

        }
        return request(app).post('/candidate')
        .send(reqUserData)
        .then((res) => {
            expect(res.statusCode).toBe(400);
            expect(res.body.data[0].messages).toBe("\"firstname\" is required");
            expect(res.body.data[1].messages).toBe("\"lastname\" is required");
            expect(res.body.data[2].messages).toBe("\"email\" is required");
            expect(res.body.data[3].messages).toBe("\"mobile\" is required");
            expect(res.body.data[4].messages).toBe("\"designationId\" is required");
            expect(res.body.data[5].messages).toBe("\"resumeUrl\" is required");
            expect(res.body.data[6].messages).toBe("\"expertiseArray\" is required");
            expect(res.body.data[7].messages).toBe("\"interviewerArray\" is required");
            expect(res.body.status).toBe(false);
        })
    });
 
    it('validate data', async () => {
        accesToken = await genarateToken.login(dbuser);
        return request(app).post('/candidate/')
        .send(userData)
        .set('Authorization', `${accesToken.token}`)
        .then(async (res) => {
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe(true);
            await canSer.deleteCandidate(res.body.data.candidateId)
        });
    });

    it('validate data', async () => {
        userData["email"] = "jonnyjams123@gmail.com",
        userData["mobile"] = "7418529630";
        return request(app).put('/candidate/360209332791279617')
        .send(userData)
        .set('Authorization', `${accesToken.token}`)
        .then(async (res) => {
            console.log(res);
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe(true);
        });
    });

    it('validate email', async() => {
        userData["email"] = "jonnyjamsgmail.com";
       return request(app).post('/candidate')
        .send(userData)
        .set('Authorization', `${accesToken.token}`)
        .then(async(res) => {
            expect(res.statusCode).toBe(400);
            expect(res.body.status).toBe(false);

        });
    });

    it('validate string field', async() => {
        const emptyData = {
            "firstname": 12,
            "middlename": 12,
            "lastname": 12,
            "email": 12,
            "mobile": "9234567890"
        }
        return request(app).post('/candidate')
        .send(emptyData)
        .set('Authorization', `${accesToken.token}`)
        .then(async (res) => {
            expect(res.statusCode).toBe(400);
            expect(res.body.data[0].messages).toBe( "\"firstname\" must be a string");
            expect(res.body.data[1].messages).toBe("\"middlename\" must be a string");
            expect(res.body.data[2].messages).toBe("\"lastname\" must be a string");
            expect(res.body.data[3].messages).toBe("\"email\" must be a string");
            expect(res.body.status).toBe(false);
            
        });
    });

    it('validate mobile', async() => {
        userData["mobile"] = "74152";
        return request(app).post('/candidate')
        .send(userData)
        .set('Authorization', `${accesToken.token}`)
        .then(async (res) => {
            expect(res.statusCode).toBe(400);
            expect(res.body.status).toBe(false);
        });
    });

    it('validate experience', async() => {
        userData["experience"] = "-2.5";
        return request(app).put('/candidate/360209332791279617')
        .send(userData)
        .set('Authorization', `${accesToken.token}`)
        .then(async (res) => {
            expect(res.statusCode).toBe(400);
            expect(res.body.status).toBe(false);
        });
    });

    it('validate date', async() => {
        userData["interviewDatetime"] = "2018-06-03T11:26:46",
        userData["profileReviewStatus"]="true";
        return request(app).put('/candidate/schedule/360209332791279617')
        .send(userData)
        .set('Authorization', `${accesToken.token}`)
        .then(async (res) => {
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe(true);
        });
    });

    it('update profileReviewStatus', async() => {
        userData["profileReviewStatus"]="false";
        return request(app).put('/candidate/reject/360209332791279617')
        .send(userData)
        .set('Authorization', `${accesToken.token}`)
        .then(async (res) => {
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe(true);
        });
    });

    // it('update profileReviewStatus', async() => {
    //     userData["updatedBy"] = "359952449138294785",
    //     userData["employeeId"]="359952449138294785",
    //     userData["profileReviewStatus"]="true";
    //     return request(app).post('/candidate/360209332791279617/review/')
    //     .send(userData)
    //     .set('Authorization', `${accesToken.token}`)
    //     .then(async (res) => {
    //         expect(res.statusCode).toBe(200);
    //         expect(res.body.status).toBe(true);
    //     });
    // });
});