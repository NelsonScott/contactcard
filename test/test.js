process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var app = require('../app');
var should = chai.should();
var monk = require('monk');
var db = monk('localhost:27017/test');
var cards = db.get('cards');
var faker = require('faker');

describe('Cards', function() {

  cards.drop();

  afterEach(function(done) {
    cards.drop();
    done();
  });

  var newCardData = function() {
    return {
      name: faker.name.findName(),
      profileImageUrl: faker.internet.url(),
      backgroundImageUrl: faker.internet.url(),
      email: faker.internet.email(),
      github: faker.internet.userName()
    };
  };

  it('Should list all cards on /api/cards GET', function(done) {
    var firstCard = newCardData();
    var secondCard = newCardData();

    cards.insert([firstCard, secondCard], function(err, res) {
      chai.request(app).
      get('/api/cards').
      end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].name.should.equal(firstCard.name);
        res.body[1].name.should.equal(secondCard.name);
        done();
      });
    });
  });

  it('Should list one card on /api/cards/:id GET', function(done) {
    var card = newCardData();
    cards.insert(card, function(err, card) {
      if (err) throw err;

      chai.request(app).
      get('/api/cards/' + card._id).
      end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.name.should.equal(card.name);
        res.body.email.should.equal(card.email);
        res.body.github.should.equal(card.github);
        done();
      });
    });
  });

  it('should add one card on /api/cards POST', function(done) {
    var card = newCardData();
    chai.request(app).
    post('/api/cards').
    send(card).
    end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.name.should.equal(card.name);
      res.body.email.should.equal(card.email);
      res.body.github.should.equal(card.github);
      done();
    });
  });

  it('should delete a card on /api/card/:id DELETE', function(done) {
    var card = newCardData();
    cards.insert(card, function(err, card) {
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
