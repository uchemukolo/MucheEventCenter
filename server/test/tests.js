import { expect } from 'chai';
import request from 'supertest';
import app from '../app';

// const request = supertest(app);
// const rootURL = '/api';
const centerUrl = '/api/v1/centers';
const centerDetailUrl = '/api/v1/centers/1';
const editCenterUrl = '/api/v1/centers/1';
const addCenterUrl = '/api/v1/centers';
const addEventUrl = '/api/v1/events';
const editEventUrl = '/api/v1/events/1';


describe('API Integration Tests', () => {
  describe('Get All Centers', () => {
    it('return 200 for successful', () => {
      request(app)
        .get(centerUrl)
        .send()
        .then((err, res) => {
          expect(res.status).to.equal(200);
        });
      // request.get(centerUrl)
      //   .send()
      //   .then((err, res) => {
      //     expect(res.status).to.equal(200);
      //     done();
      //   });
    });
    describe('Get Center Details', () => {
      it('return 200 for successful', () => {
        request(app)
          .get(centerDetailUrl)
          .send()
          .then((err, res) => {
            expect(res.status).to.equal(200);
          });
      });
    });
    describe('Modify Center Details', () => {
      it('return 200 for Update successful', () => {
        request(app)
          .put(editCenterUrl)
          .send({
            userId: 1,
            name: 'Diamond Events Place',
            image: 'http://www.imageurl.com',
            address: '2, Chevron drive, Lekki',
            description: 'Description about the Event center goes here',
            PhoneNumber: '08034345654',
            location: 'Lagos',
            capacity: 200,
            venueType: 'Conference Center',
            facilities: 'Parking',
            price: 'N500,000/day'
          })
          .then((err, res) => {
            expect(res.status).to.equal(200);
          });
      });
    });
    describe('Add a New Center', () => {
      it('return 201 for successful', () => {
        request(app)
          .post(addCenterUrl)
          .send({
            centerId: 1,
            name: 'Diamond Events Place',
            image: 'www.imageurl.com',
            address: '2, Chevron drive, Lekki',
            description: 'Description about the Event center goes here',
            PhoneNumber: '08034345654',
            location: 'Lagos',
            capacity: 200,
            venueType: 'Conference Center',
            facilities: 'Parking',
            price: 'N500,000/day'
          })
          .then((err, res) => {
            expect(res.status).to.equal(201);
          });
      });
    });
    describe('Modify Event Details', () => {
      it('return 200 for Update successful', () => {
        request(app)
          .put(editEventUrl)
          .send({
            userId: 1,
            centerId: 1,
            eventType: 'wedding Reception',
            eventDate: 2018 - 3 - 24,
            duration: '1 Day'
          })
          .then((err, res) => {
            expect(res.status).to.equal(200);
          });
      });
    });
    describe('Add a New Event', () => {
      it('return 201 for successful', () => {
        request(app)
          .post(addEventUrl)
          .send({
            userId: 1,
            centerId: 2,
            eventType: 'Wedding reception',
            eventDate: 2018 - 12 - 24,
            duration: '1 Day'
          })
          .then((err, res) => {
            expect(res.status).to.equal(201);
          });
      });
    });
  });
});
