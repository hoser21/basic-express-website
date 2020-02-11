//Author: Kevin Hoser

var express = require('express');
var router = express.Router();

data = {
  "errors" : null,
  "data" : [
    {"topping" : "cherry", "quantity" : 3},
    {"topping" : "chocolate", "quantity" : 2},
    {"topping" : "plain", "quantity" : 1}
  ]
};

/* POST order (JSON object). */
router.post('/', function(req, res, next) {
  res.json(data);
});

/* GET order (JSON object). */
router.get('/', function(req, res, next) {
  res.json(data);
});

module.exports = router;
