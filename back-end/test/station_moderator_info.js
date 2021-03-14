process.env.NODE_ENV = 'test';

let db = require("../app/models");
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var token;


chai.use(chaiHttp);
//Our parent block
describe('Use case: Station Moderator info', () => {

/*
  * Test the /GET route
  */
  describe('/login', () => {
      it('it should login a vehicle designer with correct username and password', (done) => {
        const user = {
          username: "Elie",
          password: "password152"
        }
        chai.request(server)
            .post('/evcharge/api/login')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('accessToken');
                  token = res.body.accessToken;
              done();
            });
      });
  });

  describe("get the charging events per station (F07)", () => {
      it('it should return the sessions of the stations that this station moderator is responsible for', (done) => {
        chai.request(server)
            .get('/evcharge/api/SessionsPerStation/2/20200101/20240101')
            .set('x-observatory-auth', token)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

  describe("get the charging events per point (F17)", () => {
    it('it should return the sessions of the points that this station moderator is responsible for', (done) => {
      chai.request(server)
          .get('/evcharge/api/SessionsPerPoint/5/20200101/20240101')
          .set('x-observatory-auth', token)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
});

  describe("get the vehicles charging at a time (F23)", () => {
      it('it should return the vehicles charging at the specified time and station', (done) => {
        const Body =   {
          "start_datetime": "2019-11-11 19:42:17",
          "end_datetime": "2022-08-04 23:59:59"
        }
        chai.request(server)
            .post('/evcharge/api/getVehiclesChargingAtTime')
            .set('x-observatory-auth', token)
            .send(Body)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

  describe("logout", () => {
    it("it should return http code 200", (done) => {
      chai.request(server)
          .post('/evcharge/api/logout')
          .set('x-observatory-auth', token)
          .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('array');
                //res.body.length.should.be.eql(0);
            done();
          });
        });
  });

});
