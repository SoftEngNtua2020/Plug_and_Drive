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
describe('Use case: Vehicle Owner', () => {

/*
  * Test the /GET route
  */
  describe('/login', () => {
      it('it should login a vehicle owner with correct username and password', (done) => {
        const user = {
          username: "Rusty",
          password: "password128"
        }
        chai.request(server)
            .post('/evcharge/api/login')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('accessToken');
                  token = res.body.accessToken;

                  //res.body.should.be.a('array');
                  //res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe("get user's data (F01)", () => {
      it('it should return the data of the user whose token is provided', (done) => {
        chai.request(server)
            .get('/evcharge/api/getvehicledata')
            .set('x-observatory-auth', token)
            .end((err, res) => {
                  res.should.have.status(200);

                  //res.body.should.be.a('array');
                  //res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe("get cost assumption (F33)", () => {
      it('it should return the assumption of the charging cost per program/station', (done) => {
        chai.request(server)
            .get('/evcharge/api/getvehiclecostassump')
            .set('x-observatory-auth', token)
            .end((err, res) => {
                  res.should.have.status(200);

                  //res.body.should.be.a('array');
                  //res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe("start a charging session (F19)", () => {
      it('it should start a charging session with the selected options', (done) => {
        const Body = {
           "program_id":1,
           "point_id":1,
           "protocol":"AC",
           "payment_method":"CASH",
           "station_id": 1
          }
        chai.request(server)
            .post('/evcharge/api/start_charging')
            .set('x-observatory-auth', token)
            .send(Body)
            .end((err, res) => {
                  res.should.have.status(200);

                  //res.body.should.be.a('array');
                  //res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe("view charging session history (F29)", () => {
      it('it should return a list of past charging events', (done) => {
        chai.request(server)
            .get('/evcharge/api/getvehicleeventdata')
            .set('x-observatory-auth', token)
            .end((err, res) => {
                  res.should.have.status(200);

                  //res.body.should.be.a('array');
                  //res.body.length.should.be.eql(0);
              done();
            });
      });
  });


  describe("get accumulative cost per charging session (F07)", () => {
      it("it should return the accumulative cost and the date of the user's past charging sessions", (done) => {
        chai.request(server)
            .get('/evcharge/api/getCummulativeCostPerCharge')
            .set('x-observatory-auth', token)
            .end((err, res) => {
                  res.should.have.status(200);

                  //res.body.should.be.a('array');
                  //res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe("get accumulative cost per period that is requested (F14)", () => {
      it("it should return the accumulative cost of the charging sessions in the requested time period", (done) => {
        const Body = {
           "started_date":"2020-02-25",
           "finished_date":"2021-03-07"
        }
        chai.request(server)
            .post('/evcharge/api/getCummulativeCostPerPeriod')
            .set('x-observatory-auth', token)
            .send(Body)
            .end((err, res) => {
                  res.should.have.status(200);

                  //res.body.should.be.a('array');
                  //res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe("get total bonus points (F31)", () => {
      it("it should return the total bonus points of the user whose token is provided", (done) => {
        chai.request(server)
            .get('/evcharge/api/getTotalBonus')
            .set('x-observatory-auth', token)
            .end((err, res) => {
                  res.should.have.status(200);
                  //res.body.should.be.a('array');
                  //res.body.length.should.be.eql(0);
              done();
            });
      });
  });

    describe("get times paid by card/cash (F26)", () => {
      it("it should return the times the user paid with card or cash", (done) => {
        chai.request(server)
            .get('/evcharge/api/getTimesPaidCard')
            .set('x-observatory-auth', token)
            .end((err, res) => {
                  res.should.have.status(200);
                  //res.body.should.be.a('array');
                  //res.body.length.should.be.eql(0);
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
