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
describe('Use case: Vehicle Designer', () => {

/*
  * Test the /GET route
  */
  describe('/login', () => {
      it('it should login a vehicle designer with correct username and password', (done) => {
        const user = {
          username: "Vassili",
          password: "password64"
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

  describe("get charging events by designer (F02)", () => {
      it('it should return the charging events for vehicles designed by this designer', (done) => {
        const Body = {
          "start_date": "2020-02-25",
          "end_date": "2021-03-07"
        }
        chai.request(server)
            .post('/evcharge/api/getChargingEventsByDesigner')
            .set('x-observatory-auth', token)
            .send(Body)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

  describe("get energy consumbed by EV type (F05)", () => {
      it('it should return the energy consumed by each vehicle type designed by this designer', (done) => {
        const Body = {
           "start_date": "2020-02-25",
           "end_date": "2021-03-07"
        }
        chai.request(server)
            .post('/evcharge/api/getEnergyConsumedByEVType')
            .set('x-observatory-auth', token)
            .send(Body)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

  describe("get energy consumbed by EV (F35)", () => {
      it('it should return the energy consumed by each vehicle designed by this designer', (done) => {
        const Body = {
           "start_date": "2020-02-25",
           "end_date": "2021-03-07"
        }
        chai.request(server)
            .post('/evcharge/api/getEnergyConsumedByEV')
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
