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
describe('Admin', () => {

/*
  * Test the /GET route
  */
  describe('/login', () => {
      it('it should login an admin with correct username and password', (done) => {
        const user = {
          username: "Sally",
          password: "password6"
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

  describe("/healthcheck", () => {
  it("perform a system healthcheck (end-to-end connectivity with database)", (done) => {
    chai.request(server)
        .get('/evcharge/api/admin/healthcheck')
        .set('x-observatory-auth', token)
        .end((err, res) => {
              res.should.have.status(200);
              //res.body.should.be.a('array');
              //res.body.length.should.be.eql(0);
          done();
        });
  });
});

  describe("/usermod", () => {
    it("it should create new user or update password of existing user", (done) => {
      chai.request(server)
          .post('/evcharge/api/admin/usermod/testuser/testpassword')
          .set('x-observatory-auth', token)
          .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('array');
                //res.body.length.should.be.eql(0);
            done();
          });
    });
});


  describe("/users", () => {
    it("it should return info of requested user", (done) => {
      chai.request(server)
          .get('/evcharge/api/admin/users/Vivianne')
          .set('x-observatory-auth', token)
          .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('array');
                //res.body.length.should.be.eql(0);
            done();
          });
    });
});



  describe("/logout", () => {
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
