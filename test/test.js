process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var app = require('../app');
var should = chai.should();
var monk = require('monk');
var db = monk('localhost:27017/test');
var cards = db.get('cards');

describe('Cards', function() {

  cards.drop();

  afterEach(function(done) {
    cards.drop();
    done();
  });

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

  it('Should list one cards on /api/cards/:id GET', function(done) {
    cards.insert({
      name: 'Test',
      email: 'test@example.com',
      github: 'testaccount'
    }, function(err, card) {
      if (err) throw err;

      chai.request(app).
      get('/api/cards/' + card._id).
      end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.name.should.equal('Test');
        res.body.email.should.equal('test@example.com');
        res.body.github.should.equal('testaccount');
        done();
      });
    });
  });

  it('should add one card on /api/cards POST', function(done) {
    chai.request(app).
    post('/api/cards').
    send({
      'name': 'Scott',
      'email': 'scott@scottdavidnelson.io',
      'github': 'nelsonscott'
    }).
    end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.name.should.equal('Scott');
      res.body.email.should.equal('scott@scottdavidnelson.io');
      res.body.github.should.equal('nelsonscott');
      done();
    });
  });

  it('should delete a card on /api/card/:id DELETE', function(done) {
    cards.insert({
      name: 'Test Delete',
      email: 'testdelete@example.com',
      github: 'testdeleteaccount'
    }, function(err, card) {
      if (err) throw err;

      chai.request(app).
      delete('/api/cards/' + card._id).
      end(function(err, res) {
        res.should.have.status(200);
        done();
      });
    });
  });
});
