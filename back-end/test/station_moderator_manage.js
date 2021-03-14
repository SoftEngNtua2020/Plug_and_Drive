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
describe('Use case: Station Moderator manage', () => {

/*
  * Test the /GET route
  */
  describe('/login', () => {
      it('it should login a station moderator with correct username and password', (done) => {
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

  describe("get the stations' data (Get Station Data)", () => {
      it('it should return all the data for each station that this station moderator is responsible for', (done) => {
        chai.request(server)
            .get('/evcharge/api/getStationData')
            .set('x-observatory-auth', token)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

  describe("manage the station (F11)", () => {
      it('it should modify (or create it if it does not exist) the station with the given data', (done) => {
        const Body = {
           "station":{
              "station_id":7,
              "location":"Aboudabi",
              "company_name":"IKEA",
              "phone_number":"2100000000",
              "st_moderator_id":4,
              "provider_id":1
              },
           "point":{
              "point_id": 14,
              "station_id":7
              }
        }
        chai.request(server)
            .post('/evcharge/api/manageStations')
            .set('x-observatory-auth', token)
            .send(Body)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

  describe("manage the charging program (F31)", () => {
      it('it should modify (or create it if it does not exist) the charging program with the given data', (done) => {
        const Body = {
            "program":{
               "program_id":8,
               "program_name":"EXTREME - DISCOUNT",
               "kwh_price":2.121,
               "bonus_per_kwh":0.7,
               "station_id":2
            }
         }
        chai.request(server)
            .post('/evcharge/api/manageChargingProgram')
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
