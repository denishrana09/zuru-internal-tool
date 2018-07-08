const request = require('supertest-as-promised');
const app = require('../../app');

describe('POST /auth/login - login with email and password', () => {
  it('login with valid email and invalid password', () => {
    const userData = {
      email: 'kkishan.kalavadia@gmail.com',
      password: 'kk12',
    };
    return request(app).post('/auth/login')
      .send(userData)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body.code).toBe('INVALID_LOGIN_CREDS');
      });
  });

  it('login with invalid email and valid password', () => {
    const userData = {
      email: 'kkishan.kaladia@gmail.com',
      password: 'kk123',
    };
    return request(app).post('/auth/login')
      .send(userData)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body.code).toBe('INVALID_LOGIN_CREDS');
      });
  });
  it('login with valid credentials', () => {
    const userData = {
      email: 'kkishan.kalavadia@gmail.com',
      password: 'kk123',
    };
    return request(app).post('/auth/login')
      .send(userData)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(true);
      });
  });
  it('empty email is not allowed', () => {
    const userData = {
      email: '',
      password: 'kk123',
    };
    return request(app).post('/auth/login')
      .send(userData)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.data[0].messages).toBe('"email" is not allowed to be empty');
        expect(res.body.status).toBe(false);
      });
  });
  it('empty password is not allowed', () => {
    const userData = {
      email: 'kkishan.kalavadia@gmail.com',
      password: '',
    };
    return request(app).post('/auth/login')
      .send(userData)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.data[0].messages).toBe('"password" is not allowed to be empty');
        expect(res.body.status).toBe(false);
      });
  });
  it('valid email is allowed', () => {
    const userData = {
      email: 'kkishan.kalavadia@gmail.com',
      password: 'kk123',
    };
    return request(app).post('/auth/login')
      .send(userData)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(true);
      });
  });
  it('invalid email is not allowed', () => {
    const userData = {
      email: 'kkishanklavadiagmail.com',
      password: 'kk123',
    };
    return request(app).post('/auth/login')
      .send(userData)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.data[0].messages).toBe('"email" must be a valid email');
        expect(res.body.status).toBe(false);
      });
  });
});
