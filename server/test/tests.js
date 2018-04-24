import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import dummyData from './dummy';
import model from '../models';

const should = chai.should();

chai.use(chaiHttp);

let token;
let userId;


// ///////////////////////
// // *** USERS *** ///
// /////////////////////

describe('User Controller', () => {
  it('should not let user sign up with no username', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyData.noUsernameUsers)
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
      .send(dummyData.noEmailUsers)
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
      .send(dummyData.noPasswordUsers)
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
      .send(dummyData.lessPass)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('password').equal('Password is too short!');
        done();
      });
  });

  // it('should let users sign up /signup POST', (done) => {
  //   chai.request(app)
  //     .post('/api/v1/users')
  //     .send(dummyData.newUsers)
  //     .end((err, res) => {
  //       userId = res.body.newUser.id;
  //       res.body.should.be.a('object');
  //       res.should.have.status(201);
  //       done();
  //     });
  // });

  it('should not let user sign up with the same email twice', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyData.newUsers)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should let users sign in /login POST', (done) => {
    const User = {
      username: dummyData.newUsers.email,
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
    const foundUser = {
      username: dummyData.newUsers.email,
      password: '11110000x'
    };
    chai.request(app)
      .post('/api/v1/users/login')
      .send(foundUser)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('Incorrect Password');
        done();
      });
  });

// end of user describe
});

// ///////////////////////
// // *** EVENTS *** ///
// /////////////////////

// describe('Events Controller', () => {
//   const events = {
//     centerId: 1,
//     eventType: 'Wedding',
//     eventDate: 12 - 18 - 2018,
//     duration: '1 Day',
//     ingredients: 'ingredients, ingredients, ingredients, ingredients'
//   };

//   it('should not let unauthorized user create new event', (done) => {
//     chai.request(app)
//       .post('/api/v1/events')
//       .send(events)
//       .end((err, res) => {
//         res.should.have.status(401);
//         res.body.should.be.a('object');
//         res.body.should.have.property('message').equal('Unauthorised User!');
//         done();
//       });
//   });
// });

