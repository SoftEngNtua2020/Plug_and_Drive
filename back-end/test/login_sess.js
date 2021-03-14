
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
describe('Login and test SessionsPer{EV,Point,Provider,Station}', () => {

/*
  * Test the /GET route
  */
  describe('/login', () => {
      it('it should login a user with correct username and password', (done) => {
        const user = {
          username: "Chucho",
          password: "password1"
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

  describe('/SessionsPerEV', () => {
      it('it should get sessions per electric vehicle id, dateto and datefrom', (done) => {
        chai.request(server)
            .get('/evcharge/api/SessionsPerEV/1/20190101/20200101')
            .set('x-observatory-auth', token)
            .end((err, res) => {
                  res.should.have.status(200);

                  //res.body.should.be.a('array');
                  //res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/SessionsPerPoint', () => {
      it('it should get sessions per charging point id, dateto and datefrom', (done) => {
        chai.request(server)
            .get('/evcharge/api/SessionsPerEV/1/20190101/20200101')
            .set('x-observatory-auth', token)
            .end((err, res) => {
                  res.should.have.status(200);

                  //res.body.should.be.a('array');
                  //res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/SessionsPerStation', () => {
      it('it should get sessions per station id, dateto and datefrom', (done) => {
        chai.request(server)
            .get('/evcharge/api/SessionsPerEV/1/20190101/20200101')
            .set('x-observatory-auth', token)
            .end((err, res) => {
                  res.should.have.status(200);

                  //res.body.should.be.a('array');
                  //res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/SessionsPerProvider', () => {
      it('it should get sessions per provider id, dateto and datefrom', (done) => {
        chai.request(server)
            .get('/evcharge/api/SessionsPerEV/1/20190101/20200101')
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
