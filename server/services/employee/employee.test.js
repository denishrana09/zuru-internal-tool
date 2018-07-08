// const request = require('supertest-as-promised');
// const app = require('../../app');
// const genarateToken = require('../auth/auth.service');
// const employeeService = require('./employee.service');


// describe('Employee APT', () => {
//   const userData = {
//     firstname: 'jams',
//     lastname: 'jonny',
//     email: 'jonnyjams@gmail.com',
//     mobile: '9825411664',
//     password: 'jams007',
//     code: 'ZTI0020',
//     departmentId: '360194738047811585',
//     roleId: '360194923167481857',
//     designationId: '360195307628331009',
//   };

//   const updateUserData = {
//     firstname: 'test',
//     lastname: 'test',
//     email: 'test@test.com',
//     mobile: '9826582322',
//     code: 'test001',
//     departmentId: '360194738047811585',
//     roleId: '360194923167481857',
//     designationId: '360195307628331009',
//     pictureUrl: 'test.jpg',
//     birthdate: '1999-06-27T03:32:51.431Z',
//     experience: '1',
//   };

//   const dbuser = {
//     email: 'test@test.com',
//     password: 'test',
//   };

//   describe('POST /employee/ - create new employee', () => {
//     it('required validation testing', () => {
//       const reqUserData = {
//         middlename: 'kk',
//       };
//       return request(app).post('/employee')
//         .send(reqUserData)
//         .then((res) => {
//           expect(res.statusCode).toBe(400);
//           expect(res.body.data[0].messages).toBe('"firstname" is required');
//           expect(res.body.data[1].messages).toBe('"lastname" is required');
//           expect(res.body.data[2].messages).toBe('"email" is required');
//           expect(res.body.data[3].messages).toBe('"mobile" is required');
//           expect(res.body.data[4].messages).toBe('"password" is required');
//           expect(res.body.data[5].messages).toBe('"code" is required');
//           expect(res.body.data[6].messages).toBe('"departmentId" is required');
//           expect(res.body.data[7].messages).toBe('"roleId" is required');
//           expect(res.body.data[8].messages).toBe('"designationId" is required');
//           expect(res.body.status).toBe(false);
//         });
//     });

//     it('valid string field validation testing', () => {
//       const emptyData = {
//         firstname: 12,
//         middlename: 12,
//         lastname: 12,
//         mobile: '9825411664',
//         email: 12,
//         password: 12,
//         code: 12,
//       };
//       return request(app).post('/employee')
//         .send(emptyData)
//         .then((res) => {
//           expect(res.statusCode).toBe(400);

//           expect(res.body.data[0].messages).toBe('"firstname" must be a string');
//           expect(res.body.data[1].messages).toBe('"middlename" must be a string');
//           expect(res.body.data[2].messages).toBe('"lastname" must be a string');
//           expect(res.body.data[3].messages).toBe('"email" must be a string');
//           expect(res.body.data[4].messages).toBe('"password" must be a string');
//           expect(res.body.data[5].messages).toBe('"code" must be a string');
//           expect(res.body.status).toBe(false);
//         });
//     });

//     it('empty field validation testing', () => {
//       const emptyData = {
//         firstname: '',
//         middlename: '',
//         lastname: '',
//         email: '',
//         mobile: '',
//         password: '',
//         code: '',
//         departmentId: '',
//         roleId: '',
//         designationId: '',
//       };
//       return request(app).post('/employee')
//         .send(emptyData)
//         .then((res) => {
//           expect(res.statusCode).toBe(400);
//           expect(res.body.data[0].messages).toBe('"firstname" is not allowed to be empty');
//           expect(res.body.data[1].messages).toBe('"middlename" is not allowed to be empty');
//           expect(res.body.data[2].messages).toBe('"lastname" is not allowed to be empty');
//           expect(res.body.data[3].messages).toBe('"email" is not allowed to be empty');
//           expect(res.body.data[4].messages).toBe('"mobile" is not allowed to be empty');
//           expect(res.body.data[5].messages).toBe('"password" is not allowed to be empty');
//           expect(res.body.data[6].messages).toBe('"code" is not allowed to be empty');
//           expect(res.body.status).toBe(false);
//         });
//     });

//     it('valid email id', () => {
//       userData.email = 'jonnyjamsgmail.com';
//       return request(app).post('/employee')
//         .send(userData)
//         .then((res) => {
//           expect(res.statusCode).toBe(400);
//           expect(res.body.data[0].messages).toBe('"email" must be a valid email');
//           expect(res.body.status).toBe(false);
//           userData.email = 'jonnyjams@gmail.com';
//         });
//     });

//     it('valid mobile number', async () => {
//       userData.mobile = '982541166';
//       accessToken = await genarateToken.login(dbuser);

//       return request(app).post('/employee')
//         .send(userData)
//         .set('Authorization', `${accessToken.token}`)
//         .then((res) => {
//           expect(res.statusCode).toBe(400);
//           expect(res.body.code).toBe('INVALID_MOBILE_NUMBER');
//           expect(res.body.status).toBe(false);
//           userData.mobile = '9825411664';
//         });
//     });

//     it('alpha numeric mobile no', async () => {
//       userData.mobile = 'abc';
//       accessToken = await genarateToken.login(dbuser);

//       return request(app).post('/employee')
//         .send(userData)
//         .set('Authorization', `${accessToken.token}`)
//         .then((res) => {
//           expect(res.statusCode).toBe(400);
//           expect(res.body.code).toBe('INVALID_MOBILE_NUMBER');
//           expect(res.body.status).toBe(false);
//           userData.mobile = '9825411664';
//         });
//     });

//     it('valid user data', async () => {
//       userData.firstname = 'Jams';
//       accessToken = await genarateToken.login(dbuser);

//       return request(app).post('/employee')
//         .send(userData)
//         .set('Authorization', `${accessToken.token}`)
//         .then(async (res) => {
//           expect(res.statusCode).toBe(200);
//           expect(res.body.status).toBe(true);
//           const employeeId = res.body.data.employeeId;
//           await employeeService.deleteEmployeeById(employeeId);
//         });
//     });

//     it('check duplication of mobile number, email id and code', async () => {
//       userData.mobile = '9428885585';
//       userData.email = 'test@test.com';
//       userData.code = 'test001';
//       accessToken = await genarateToken.login(dbuser);

//       return request(app).post('/employee')
//         .send(userData)
//         .set('Authorization', `${accessToken.token}`)
//         .then((res) => {
//           expect(res.statusCode).toBe(500);
//           expect(res.body.code).toBe('UNIQUE_CONSTRAINT_ERROR');
//           expect(res.body.status).toBe(false);
//         });
//     });
//   });

//   describe('PUT /employee/ - update exit employee', () => {
//     it('required validation testing', () => {
//       const reqUserData = {
//         middlename: 'kk',
//       };
//       return request(app).put('/employee/360512802329133057')
//         .send(reqUserData)
//         .then((res) => {
//           expect(res.statusCode).toBe(400);
//           expect(res.body.data[0].messages).toBe('"firstname" is required');
//           expect(res.body.data[1].messages).toBe('"lastname" is required');
//           expect(res.body.data[2].messages).toBe('"email" is required');
//           expect(res.body.data[3].messages).toBe('"mobile" is required');
//           expect(res.body.data[4].messages).toBe('"code" is required');
//           expect(res.body.data[5].messages).toBe('"departmentId" is required');
//           expect(res.body.data[6].messages).toBe('"roleId" is required');
//           expect(res.body.data[7].messages).toBe('"designationId" is required');
//           expect(res.body.data[8].messages).toBe('"pictureUrl" is required');
//           expect(res.body.data[9].messages).toBe('"birthdate" is required');
//           expect(res.body.data[10].messages).toBe('"experience" is required');

//           expect(res.body.status).toBe(false);
//         });
//     });

//     it('valid string field validation testing', () => {
//       const emptyData = {
//         firstname: 12,
//         middlename: 12,
//         lastname: 12,
//         mobile: '9825411664',
//         email: 12,
//         code: 12,
//         pictureUrl: 12,
//         birthdate: 12,
//         experience: '1',
//         departmentId: '360194738047811585',
//         roleId: '360194923167481857',
//         designationId: '360195307628331009',
//       };
//       return request(app).put('/employee/360512802329133057')
//         .send(emptyData)
//         .then((res) => {
//           expect(res.statusCode).toBe(400);
//           expect(res.body.data[0].messages).toBe('"firstname" must be a string');
//           expect(res.body.data[1].messages).toBe('"middlename" must be a string');
//           expect(res.body.data[2].messages).toBe('"lastname" must be a string');
//           expect(res.body.data[3].messages).toBe('"email" must be a string');
//           expect(res.body.data[4].messages).toBe('"code" must be a string');
//           expect(res.body.data[5].messages).toBe('"pictureUrl" must be a string');

//           expect(res.body.status).toBe(false);
//         });
//     });

//     it('check duplication of mobile number, email id and code', async () => {
//       updateUserData.mobile = '9428759065';
//       updateUserData.email = 'kkishan.kalavadia@gmail.com';
//       updateUserData.code = 'ZTI0014';
//       accessToken = await genarateToken.login(dbuser);

//       return request(app).put('/employee/360512802329133057')
//         .send(updateUserData)
//         .set('Authorization', `${accessToken.token}`)
//         .then((res) => {
//           expect(res.statusCode).toBe(500);
//           expect(res.body.code).toBe('UNIQUE_CONSTRAINT_ERROR');
//           expect(res.body.status).toBe(false);

//           updateUserData.mobile = '9826582322';
//           updateUserData.email = 'test@test.com';
//           updateUserData.code = 'test001';
//         });
//     });

//     it('valid email id', () => {
//       userData.email = 'testtest.com';
//       return request(app).put('/employee/360512802329133057')
//         .send(userData)
//         .then((res) => {
//           expect(res.statusCode).toBe(400);
//           expect(res.body.data[0].messages).toBe('"email" must be a valid email');
//           expect(res.body.status).toBe(false);
//           userData.email = 'test@test.com';
//         });
//     });

//     it('update after valid data', async () => {
//       accessToken = await genarateToken.login(dbuser);

//       return request(app).put('/employee/360512802329133057')
//         .send(updateUserData)
//         .set('Authorization', `${accessToken.token}`)
//         .then(async (res) => {
//           expect(res.statusCode).toBe(200);
//           expect(res.body.status).toBe(true);
//         });
//     });

//     it('invalid experience', async () => {
//       updateUserData.experience = '-1.5';
//       accessToken = await genarateToken.login(dbuser);

//       return request(app).put('/employee/360512802329133057')
//         .send(updateUserData)
//         .set('Authorization', `${accessToken.token}`)
//         .then((res) => {
//           expect(res.statusCode).toBe(400);
//           expect(res.body.code).toBe('INVALID_EXP');
//           expect(res.body.status).toBe(false);
//         });
//     });

//     it('insert experience is greater than or equal to 0', async () => {
//       updateUserData.experience = '1.5';
//       accessToken = await genarateToken.login(dbuser);

//       return request(app).put('/employee/360512802329133057')
//         .send(updateUserData)
//         .set('Authorization', `${accessToken.token}`)
//         .then((res) => {
//           expect(res.statusCode).toBe(200);
//           expect(res.body.status).toBe(true);
//         });
//     });

//     it('valid mobile number', async () => {
//       updateUserData.mobile = '982658232';
//       accessToken = await genarateToken.login(dbuser);

//       return request(app).put('/employee/360512802329133057')
//         .send(updateUserData)
//         .set('Authorization', `${accessToken.token}`)
//         .then((res) => {
//           expect(res.statusCode).toBe(400);
//           expect(res.body.code).toBe('INVALID_MOBILE_NUMBER');
//           expect(res.body.status).toBe(false);
//           updateUserData.mobile = '9826582322';
//         });
//     });
//     it('alpha numeric mobile no', async () => {
//       updateUserData.mobile = 'abc';
//       accessToken = await genarateToken.login(dbuser);

//       return request(app).put('/employee/360512802329133057')
//         .send(updateUserData)
//         .set('Authorization', `${accessToken.token}`)
//         .then((res) => {
//           expect(res.statusCode).toBe(400);
//           expect(res.body.code).toBe('INVALID_MOBILE_NUMBER');
//           expect(res.body.status).toBe(false);
//           updateUserData.mobile = '9826582322';
//         });
//     });
//   });
//   describe('GET /employee - get all employee', () => {
//     it('get employee', async () => {
//       accessToken = await genarateToken.login(dbuser);

//       return request(app).get('/employee')
//         .send(userData)
//         .set('Authorization', `${accessToken.token}`)
//         .then((res) => {
//           expect(res.statusCode).toBe(200);
//           expect(res.body.status).toBe(true);
//         });
//     });
//   });

//   describe('GET /employee/:ID - get all employee', () => {
//     it('get employee by ID', async () => {
//       accessToken = await genarateToken.login(dbuser);

//       return request(app).get('/employee/360512802329133057')
//         .send(userData)
//         .set('Authorization', `${accessToken.token}`)
//         .then((res) => {
//           expect(res.statusCode).toBe(200);
//           expect(res.body.status).toBe(true);
//         });
//     });
//   });

//   describe('post /employee/:employeeId/candidate/:candidateId/review - get all employee', () => {
//     it('review status is alphanumeric', async () => {
//       status = {
//         status: 12,
//       };
//       accessToken = await genarateToken.login(dbuser);

//       return request(app).put('/employee/360512802329133057/candidate/360239109094834177/review')
//         .send(status)
//         .set('Authorization', `${accessToken.token}`)
//         .then((res) => {
//           expect(res.statusCode).toBe(400);
//           expect(res.body.data[0].messages).toBe('"status" must be a string');
//           expect(res.body.status).toBe(false);
//         });
//     });

//     it('review status is empty', async () => {
//       status = {
//       };
//       accessToken = await genarateToken.login(dbuser);

//       return request(app).put('/employee/360512802329133057/candidate/360239109094834177/review')
//         .send(status)
//         .set('Authorization', `${accessToken.token}`)
//         .then((res) => {
//           expect(res.statusCode).toBe(400);
//           expect(res.body.data[0].messages).toBe('"status" is required');
//           expect(res.body.status).toBe(false);
//         });
//     });

//     it('remark is alphanumeric', async () => {
//       remarks = {
//         remarks: 12,
//       };
//       accessToken = await genarateToken.login(dbuser);

//       return request(app).put('/employee/360512802329133057/candidate/360239109094834177/remarks')
//         .send(remarks)
//         .set('Authorization', `${accessToken.token}`)
//         .then((res) => {
//           expect(res.statusCode).toBe(400);
//           expect(res.body.data[0].messages).toBe('"remarks" must be a string');
//           expect(res.body.status).toBe(false);
//         });
//     });

//     it('remark is empty', async () => {
//       remarks = {
//       };
//       accessToken = await genarateToken.login(dbuser);

//       return request(app).put('/employee/360512802329133057/candidate/360239109094834177/remarks')
//         .send(remarks)
//         .set('Authorization', `${accessToken.token}`)
//         .then((res) => {
//           expect(res.statusCode).toBe(400);
//           expect(res.body.data[0].messages).toBe('"remarks" is required');
//           expect(res.body.status).toBe(false);
//         });
//     });
//   });
// });
