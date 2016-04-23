process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var app = require('../app');
var should = chai.should();

describe('Cards', function() {
  it('Should list all cards on /api/cards GET', function(done) {
    chai.request(app).
    get('/api/cards').
    end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    });
  });
  it('Should list one cards on /api/cards/:id GET');
  it('should add one card on /api/cards POST', function(done) {
    chai.request(app).
    post('/api/cards').
    send({
      'name': 'Scott',
      'email': 'scott@scottdavidnelson.io',
      'github': 'nelsonscott'
    }).
    end(function(err, res) {
      myRes = res;
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be({
        'name': 'Scott',
        'email': 'scott@scottdavidnelson.io',
        'github': 'nelsonscott'
      });
    });
    done();
  });
  it('should update a card on /api/card/:id PUT');
  it('should delete a card on /api/card/:id DELETE');
});
