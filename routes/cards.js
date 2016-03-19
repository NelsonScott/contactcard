var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/contactcard');

router.get('/', function(req, res) {
  var collection = db.get('cards');

  collection.find({}, function(err, cards) {
    if (err) throw err;

    res.json(cards);
  });
});

router.post('/', function(req, res) {
  var collection = db.get('cards');
  var body = req.body;

  collection.insert({
    name: body.name,
    email: body.email
  }, function(err, card) {
    if (err) throw err;

    res.json(card);
  });
});

module.exports = router;
