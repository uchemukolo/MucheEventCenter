import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';
import db from '../models';

const should = chai.should();

chai.use(chaiHttp);

let token;
let userId;
let id;

/** testing the home endpoint */

describe('Muche Event manager', () => {
  it('should get 200 status', (done) => {
    chai.request(app)
      .get('/api/v1/home')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(200);
        res.body.should.have.property('message').equal('Welcome To Muche Event manager API!!!');
        done();
      });
  });
});

// ///////////////////////
// // *** USERS *** ///
// /////////////////////

describe('User Controller', () => {
  it('should not let user sign up with no username', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send({
        fullName: 'John Doe',
        email: 'johndoe@email.com',
        phoneNumber: '08027270618',
        password: '11110000',
        confirmPassword: '11110000'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('username').equal('Please Enter Username');
        done();
      });
  });

  it('should not let user sign up with no email', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send({
        username: 'johndoe',
        fullName: 'John Doe',
        phoneNumber: '08027270618',
        password: '11110000',
        confirmPassword: '11110000'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('email').equal('Please Enter Email');
        done();
      });
  });

  it('should not let user sign up with no password', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send({
        username: 'johndoe',
        fullName: 'John Doe',
        email: 'johndoe@email.com',
        phoneNumber: '08027270618',
        confirmPassword: '11110000'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('password').equal('Please Enter password');
        done();
      });
  });

  it('should not let user sign up with password less than 6', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send({
        username: 'johndoe',
        fullName: 'John Doe',
        email: 'johndoe@email.com',
        phoneNumber: '08027270618',
        password: '111',
        confirmPassword: '11110000'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('password').equal('Password is too short!');
        done();
      });
  });

  it('should let users sign up /signup POST', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send({
        username: 'johndoe',
        fullName: 'John Doe',
        email: 'johndoe@email.com',
        phoneNumber: '08027270618',
        password: '11110000',
        confirmPassword: '11110000'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        userId = res.body.newUser.id;
        done();
      });
  });

  it('should not let user sign up with the same email twice', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send({
        username: 'johndoe',
        fullName: 'John Doe',
        email: 'johndoe@email.com',
        phoneNumber: '08027270618',
        password: '11110000',
        confirmPassword: '11110000'
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should let users sign in /login POST', (done) => {
    const User = {
      username: 'johndoe@email.com',
      password: '11110000'
    };
    chai.request(app)
      .post('/api/v1/users/login')
      .send(User)
      .end((err, res) => {
        token = res.body.Token;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('Signin Successful!');
        res.body.should.have.property('Token');
        done();
      });
  });

  it('should not let users login with wrong password', (done) => {
    const User = {
      username: 'johndoe@email.com',
      password: '11110000x'
    };
    chai.request(app)
      .post('/api/v1/users/login')
      .send(User)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('Incorrect Password');
        done();
      });
  });
  it('should NOT let users sign in with wrong credentials /signin POST', (done) => {
    const User = {
      username: 'dummy house',
      password: '11110000'
    };
    chai.request(app)
      .post('/api/v1/users/login')
      .send(User)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('Incorrect Signin Credentials!');
        done();
      });
  });
});

// ///////////////////////
// // *** EVENTS *** ///
// /////////////////////

// describe('Events Controller', () => {
//   const events = {
//     userId: 1,
//     centerId: 1,
//     eventType: 'Chrismas Party',
//     eventDate: 12 - 22 - 2018,
//     duration: '1 Day',

//   };

//   it('should not let unauthorized user create new event', (done) => {
//     chai.request(app)
//       .post('/api/v1/events')
//       .send(events)
//       .end((err, res) => {
//         res.should.have.status(401);
//         res.body.should.be.a('object');
//         // res.body.should.have.property('message').equal('Unauthorised User!');
//         done();
//       });
//   });

//   it('should let authorized user create new event', (done) => {
//     chai.request(app)
//       .post('/api/v1/events')
//       .send(events)
//       .set('x-token', token)
//       .end((err, res) => {
//         id = res.body.userId;
//         res.should.have.status(201);
//         res.body.should.be.a('object');

//         done();
//       });
//   });
//   it('should let authorized user Modify specific event', (done) => {
//     const modifyEvents = {
//       userId: 1,
//       centerId: 1,
//       eventType: 'Chrismas Party',
//       eventDate: 12 - 22 - 2018,
//       duration: '1 Day',
//     };
//     chai.request(app)
//       .put('/api/v1/events/:id')
//       .send(modifyEvents)
//       .set('x-token', token)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         done();
//       });
//   });
// });

